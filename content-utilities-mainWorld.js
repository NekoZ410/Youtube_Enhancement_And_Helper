// [MAIN WORLD] utilities - shortsToWatch, noPlaylistTrap: URL transformer & Navigation interceptor
(function () {
    // settings values
    const settings = { shortsToWatch: false, noPlaylistTrap: false };
    let isNoPlaylistTrapInitialized = false;
    let isShortsToWatchInitialized = false;

    const BUFFER_LIMIT = 10;
    const STORAGE_KEY = "YEAH_URL_RESTORE_BUFFER";

    const WATCH_URL_PATTERN = /(?:https:\/\/www\.youtube\.com)?\/watch(?:\?v=|\/)([a-zA-Z0-9_-]{11})/; // redefine because MAIN_SELECTORS.js not injected into MAIN WORLD
    const SHORTS_URL_PATTERN = /(?:https:\/\/www\.youtube\.com)?\/shorts\/([a-zA-Z0-9_-]{11})/;

    // using sessionStorage to store and retrieve url buffer
    const storeBufferToSessionStorage = (type, id, originalUrl) => {
        const rawData = sessionStorage.getItem(STORAGE_KEY);
        const buffer = rawData ? JSON.parse(rawData) : { shorts: { data: {}, keys: [] }, playlist: { data: {}, keys: [] } };

        const target = buffer[type];
        if (!target.data[id]) {
            if (target.keys.length >= BUFFER_LIMIT) {
                const oldestKey = target.keys.shift();
                delete target.data[oldestKey];
            }

            target.keys.push(id);
            target.data[id] = originalUrl;
            sessionStorage.setItem(STORAGE_KEY, JSON.stringify(buffer));
        }
    };

    const retrieveBufferFromSessionStorage = (type) => {
        const match = window.location.href.match(WATCH_URL_PATTERN);
        if (match) {
            const videoId = match[1];
            const rawData = sessionStorage.getItem(STORAGE_KEY);
            if (!rawData) return;

            const buffer = JSON.parse(rawData);
            const originalUrl = buffer[type]?.data[videoId];

            if (originalUrl) {
                window.location.replace(originalUrl);
            }
        }
    };

    const getProcessedUrl = (url) => {
        if (!url || typeof url !== "string") return url;

        let newUrl = url;

        // shortsToWatch: transform url from "/shorts/" to "/watch/"
        if (isShortsToWatchInitialized && settings.shortsToWatch && url.includes("/shorts/")) {
            const match = url.match(SHORTS_URL_PATTERN);
            if (match) {
                const videoId = match[1];
                storeBufferToSessionStorage("shorts", videoId, url);
                newUrl = url.replace(/\/shorts\//, "/watch/");
            }
        }

        // noPlaylistTrap: clean url from playlist parameters
        if (isNoPlaylistTrapInitialized && settings.noPlaylistTrap && url.includes("watch?v=") && url.includes("&list=")) {
            const match = url.match(WATCH_URL_PATTERN);
            if (match) {
                const videoId = match[1];
                storeBufferToSessionStorage("playlist", videoId, url);
                const prefix = url.startsWith("http") ? "https://www.youtube.com" : "";
                newUrl = `${prefix}/watch?v=${videoId}`;
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
    const checkCurrentURL = () => {
        const currentUrl = window.location.href;
        const processedUrl = getProcessedUrl(currentUrl);
        if (processedUrl !== currentUrl) {
            window.location.replace(processedUrl);
        }
    };

    // listen for changes from ISOLATED WORLD
    window.addEventListener("YEAH_shortsToWatch_transformURLs", (e) => {
        isShortsToWatchInitialized = true;
        const wasEnabled = settings.shortsToWatch;
        settings.shortsToWatch = e.detail.isEnabled;

        if (settings.shortsToWatch) {
            checkCurrentURL();
        } else if (wasEnabled && !settings.shortsToWatch) {
            retrieveBufferFromSessionStorage("shorts");
        }
    });

    window.addEventListener("YEAH_noPlaylistTrap_cleanURLs", (e) => {
        isNoPlaylistTrapInitialized = true;
        const wasEnabled = settings.noPlaylistTrap;
        settings.noPlaylistTrap = e.detail.isEnabled;

        if (settings.noPlaylistTrap) {
            checkCurrentURL();
        } else if (wasEnabled && !settings.noPlaylistTrap) {
            retrieveBufferFromSessionStorage("playlist");
        }
    });
})();
