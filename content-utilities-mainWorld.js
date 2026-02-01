// [MAIN WORLD] utilities - shortsToWatch: URLs transforming and navigation intercepting
(function () {
    let isEnabled = true;

    // URLs transforming
    const getTransformedUrl = (url) => {
        if (!url || typeof url !== "string") return url;

        if (isEnabled && url.includes("/shorts/")) {
            return url.replace(/\/shorts\//, "/watch/");
        }
        return url;
    };

    // monkey patching
    const originalPushState = history.pushState;
    history.pushState = function (state, title, url) {
        return originalPushState.apply(this, [state, title, getTransformedUrl(url)]);
    };

    const originalReplaceState = history.replaceState;
    history.replaceState = function (state, title, url) {
        return originalReplaceState.apply(this, [state, title, getTransformedUrl(url)]);
    };

    // navigation intercepting
    if (window.navigation) {
        window.navigation.addEventListener("navigate", (event) => {
            const url = event.destination.url;
            if (isEnabled && url.includes("/shorts/")) {
                event.intercept({
                    handler() {
                        window.location.replace(url.replace(/\/shorts\//, "/watch/"));
                    },
                });
            }
        });
    }

    // add event listener to listen for ISOLATED WORLD
    window.addEventListener("YEAH_shortsToWatch_transformURLs", (event) => {
        isEnabled = event.detail.isEnabled;
        if (isEnabled && window.location.pathname.startsWith("/shorts/")) {
            window.location.replace(window.location.href.replace(/\/shorts\//, "/watch/"));
        }
    });
})();
