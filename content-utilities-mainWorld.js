// [MAIN WORLD] utilities - shortsToWatch, noPlaylistTrap: URL transformer & Navigation interceptor
(function () {
    // settings values
    const settings = {
        shortsToWatch: true,
        noPlaylistTrap: true,
    };

    const VIDEO_WATCH_PATTERN = /(?:https:\/\/www\.youtube\.com)?\/watch(?:\?v=|\/)([a-zA-Z0-9_-]{11})/; // redefine because MAIN_SELECTORS.js not injected into MAIN WORLD

    const getProcessedUrl = (url) => {
        if (!url || typeof url !== "string") return url;

        let newUrl = url;

        // shortsToWatch: transform url from "/shorts/" to "/watch/"
        if (settings.shortsToWatch && newUrl.includes("/shorts/")) {
            newUrl = newUrl.replace(/\/shorts\//, "/watch/");
        }

        // noPlaylistTrap: clean url from playlist parameters
        if (settings.noPlaylistTrap && newUrl.includes("watch?v=") && newUrl.includes("&list=")) {
            const match = newUrl.match(VIDEO_WATCH_PATTERN);
            if (match) {
                const prefix = newUrl.startsWith("http") ? "https://www.youtube.com" : "";
                newUrl = `${prefix}/watch?v=${match[1]}`;
            }
        }

        return newUrl;
    };

    // monkey patching
    const patchHistory = (method) => {
        const original = history[method];
        history[method] = function (state, title, url) {
            return original.apply(this, [state, title, getProcessedUrl(url)]);
        };
    };
    patchHistory("pushState");
    patchHistory("replaceState");

    // navigation interceptor
    if (window.navigation) {
        window.navigation.addEventListener("navigate", (event) => {
            const originalUrl = event.destination.url;
            const processedUrl = getProcessedUrl(originalUrl);

            if (processedUrl !== originalUrl) {
                event.intercept({
                    handler() {
                        window.location.replace(processedUrl);
                    },
                });
            }
        });
    }

    // checking and redirect
    const checkCurrentPage = () => {
        const currentUrl = window.location.href;
        const processedUrl = getProcessedUrl(currentUrl);
        if (processedUrl !== currentUrl) {
            window.location.replace(processedUrl);
        }
    };

    // listen for changes from ISOLATED WORLD
    window.addEventListener("YEAH_shortsToWatch_transformURLs", (e) => {
        settings.shortsToWatch = e.detail.isEnabled;
        checkCurrentPage();
    });

    window.addEventListener("YEAH_noPlaylistTrap_cleanURLs", (e) => {
        settings.noPlaylistTrap = e.detail.isEnabled;
        checkCurrentPage();
    });
})();
