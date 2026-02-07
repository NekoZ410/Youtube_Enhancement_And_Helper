// utilities: style settings
const utilityStyleSettings = {
    "utilities-channelRedirImprove": {
        styleIdStatic: "utilities-channelRedirImprove-inject-static",
        cssStatic: `
            a.utilities-channelRedirImprove-a {
                text-decoration: none;
                cursor: help;
                color: inherit;
            }`,
        styleIdDynamic: "utilities-channelRedirImprove-inject-dynamic",
        cssDynamicGen: (isEnabled) => {
            if (!isEnabled) return "";
            return `
                a.utilities-channelRedirImprove-a span.yt-core-attributed-string--link-inherit-color {
                    color: var(--main-color) !important;
                }`;
        },
    },
};

// utilities: fetch and cache oembed data
const oembedCache = new Map();
async function getOEmbedData(videoUrl) {
    if (!videoUrl) return null;
    if (oembedCache.has(videoUrl)) return oembedCache.get(videoUrl); // use cached data if available

    const endpoint = `https://www.youtube.com/oembed?url=${encodeURIComponent(videoUrl)}&format=json`;
    try {
        const response = await fetch(endpoint);
        if (!response.ok) return null;

        const data = await response.json();
        oembedCache.set(videoUrl, data);
        return data;
    } catch (error) {
        console.warn(`[YEAH] Failed to fetch oembed data for: ${videoUrl}`, error);
        return null;
    }
}

// utilities - shortsToWatch: main processing
function processShortsToWatch(settings) {
    const isEnabled = settings["utilities-shortsToWatch"];

    const event = new CustomEvent("YEAH_shortsToWatch_transformURLs", {
        detail: { isEnabled: isEnabled },
    });
    window.dispatchEvent(event);
}

// utilities - noPlaylistTrap: main processing
function processNoPlaylistTrap(settings) {
    const isEnabled = settings["utilities-noPlaylistTrap"];

    const event = new CustomEvent("YEAH_noPlaylistTrap_cleanURLs", {
        detail: { isEnabled: isEnabled },
    });
    window.dispatchEvent(event);
}

// utilities - channelRedirImprove: main processing
function processChannelRedirImprove(settings) {
    const isEnabled = settings["utilities-channelRedirImprove"];

    // if disabled, remove elements
    if (!isEnabled) {
        // reposition original elements
        const wrappers = document.querySelectorAll("a.utilities-channelRedirImprove-a");
        wrappers.forEach((wrapper) => {
            const originalContent = wrapper.firstChild;
            if (originalContent) {
                wrapper.parentNode.insertBefore(originalContent, wrapper);
            }
            wrapper.remove();
        });

        // clean up flags
        const processedNodes = document.querySelectorAll("[data-processing-redir]");
        processedNodes.forEach((node) => node.removeAttribute("data-processing-redir"));
        return;
    }

    // process home avatars
    const homeNodes = document.querySelectorAll(`${CELLS_VIDEOS}, ${CELLS_VIDEOS_COLLAB}, ${SECTION_OTHERS_VIDEOS}`);
    homeNodes.forEach((node) => {
        const channelLinkEl = node.querySelector(".yt-core-attributed-string__link");
        const avatarEl = node.querySelector(".yt-spec-avatar-shape > div");

        if (channelLinkEl && avatarEl && channelLinkEl.href) {
            if (avatarEl.parentNode.classList.contains("utilities-channelRedirImprove-a")) return; // prevent duplicates

            const wrapper = document.createElement("a");
            wrapper.href = channelLinkEl.href;
            wrapper.className = "utilities-channelRedirImprove-a";
            wrapper.onclick = (e) => e.stopPropagation();

            avatarEl.parentNode.insertBefore(wrapper, avatarEl);
            wrapper.appendChild(avatarEl);
        }
    });

    // process watch sidebar channel names
    const sidebarNodes = document.querySelectorAll(`${SIDEBAR_VIDEOS_NORMAL}, ${SIDEBAR_VIDEOS_PLTRAP}`);
    sidebarNodes.forEach(async (node) => {
        const videoUrlEl = node.querySelector(".yt-lockup-view-model__content-image");
        const channelNameEl = node.querySelectorAll(".yt-core-attributed-string")[1];

        if (videoUrlEl && videoUrlEl.href && channelNameEl) {
            if (channelNameEl.parentNode.classList.contains("utilities-channelRedirImprove-a")) return; // prevent duplicates
            if (node.dataset.processingRedir) return; // prevent duplicates
            node.dataset.processingRedir = "true";

            const oEmbedData = await getOEmbedData(videoUrlEl.href);
            const channelUrl = oEmbedData?.author_url;
            if (channelUrl) {
                const wrapper = document.createElement("a");
                wrapper.href = channelUrl;
                wrapper.className = "utilities-channelRedirImprove-a";
                wrapper.onclick = (e) => e.stopPropagation();

                channelNameEl.parentNode.insertBefore(wrapper, channelNameEl);
                wrapper.appendChild(channelNameEl);
            }
        }
    });

    // process playlist panel channel names
    const plPanelNodes = document.querySelectorAll(`${SIDEBAR_PLPANEL_VIDEOS}`);
    plPanelNodes.forEach(async (node) => {
        const videoUrlEl = node.querySelector("#wc-endpoint");
        const channelNameEl = node.querySelector("#byline");

        if (videoUrlEl && videoUrlEl.href && channelNameEl) {
            if (channelNameEl.parentNode.classList.contains("utilities-channelRedirImprove-a")) return; // prevent duplicates
            if (node.dataset.processingRedir) return; // prevent duplicates
            node.dataset.processingRedir = "true";

            const oEmbedData = await getOEmbedData(videoUrlEl.href);
            const channelUrl = oEmbedData?.author_url;
            if (channelUrl) {
                const wrapper = document.createElement("a");
                wrapper.href = channelUrl;
                wrapper.className = "utilities-channelRedirImprove-a";
                wrapper.onclick = (e) => e.stopPropagation();

                channelNameEl.parentNode.insertBefore(wrapper, channelNameEl);
                wrapper.appendChild(channelNameEl);
            }
        }
    });
}

// utilities: observer to handle dynamic content
let currentUtilsSettings = null;
function setupUtilitiesObserver() {
    if (!document.body) {
        window.requestAnimationFrame(setupUtilitiesObserver);
        return;
    }

    const observer = new MutationObserver((mutations) => {
        if (mutations.some((m) => m.addedNodes.length > 0)) {
            setTimeout(() => {
                if (currentUtilsSettings) processChannelRedirImprove(currentUtilsSettings);
            }, 100); // wait for DOM to settle
        }
    });

    observer.observe(document.body, { childList: true, subtree: true });
}

// utilities: init settings on load
initModuleSettings(UTILITIES_DEFAULT_SETTINGS, (settings) => {
    // update global variable
    currentUtilsSettings = settings;

    applyModuleStyles(settings, utilityStyleSettings);
    processShortsToWatch(settings);
    processNoPlaylistTrap(settings);
    processChannelRedirImprove(settings);
    setupUtilitiesObserver();
});

// utilities: listen for storage changes
setupModuleStorageListener(UTILITIES_DEFAULT_SETTINGS, (settings) => {
    // update global variable
    currentUtilsSettings = settings;

    applyModuleStyles(settings, utilityStyleSettings);
    processShortsToWatch(settings);
    processNoPlaylistTrap(settings);
    processChannelRedirImprove(settings);
});
