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
                a.utilities-channelRedirImprove-a span.yt-core-attributed-string {
                    color: #327CC8 !important;
                }`;
        },
    },
};

// utilities: oembed cache and fetcher
const oembedCache = new Map();
let isChannelRedirImproveEnabled = true;

async function getChannelUrlFromOembed(videoUrl) {
    if (!videoUrl) return null;

    if (oembedCache.has(videoUrl)) {
        return oembedCache.get(videoUrl);
    }

    try {
        const oembedUrl = `https://www.youtube.com/oembed?url=${videoUrl}&format=json`;
        const response = await fetch(oembedUrl);
        if (!response.ok) return null;

        const json = await response.json();
        const authorUrl = json.author_url;

        if (authorUrl) {
            oembedCache.set(videoUrl, authorUrl);
            return authorUrl;
        }
    } catch (error) {
        console.warn("[YouTube Enhancement And Helper] Failed to fetch oembed:", error);
    }
    return null;
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
function processChannelRedirImprove() {
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
    const sidebarNodes = document.querySelectorAll(SIDEBAR_VIDEOS);
    sidebarNodes.forEach(async (node) => {
        const videoLinkEl = node.querySelector(".yt-lockup-view-model__content-image");
        const channelNameEl = node.querySelectorAll(".yt-core-attributed-string")[1];

        if (videoLinkEl && videoLinkEl.href && channelNameEl) {
            if (channelNameEl.parentNode.classList.contains("utilities-channelRedirImprove-a")) return; // prevent duplicates
            if (node.dataset.processingRedir) return; // prevent duplicates
            node.dataset.processingRedir = "true";

            const videoUrl = videoLinkEl.href;
            const channelUrl = await getChannelUrlFromOembed(videoUrl);
            if (channelUrl) {
                if (!isChannelRedirImproveEnabled) return;

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
    const plPanelNodes = document.querySelectorAll(SIDEBAR_PLPANEL_VIDEOS);
    plPanelNodes.forEach(async (node) => {
        const videoLinkEl = node.querySelector("#wc-endpoint");
        const channelNameEl = node.querySelector("#byline");

        if (videoLinkEl && videoLinkEl.href && channelNameEl) {
            if (channelNameEl.parentNode.classList.contains("utilities-channelRedirImprove-a")) return; // prevent duplicates
            if (node.dataset.processingRedir) return; // prevent duplicates
            node.dataset.processingRedir = "true";

            const videoUrl = videoLinkEl.href;
            const channelUrl = await getChannelUrlFromOembed(videoUrl);
            if (channelUrl) {
                if (!isChannelRedirImproveEnabled) return;

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

// utilities - channelRedirImprove: remove elements when disabled
function removeChannelRedirImprove() {
    // reposition original elements
    const wrappers = document.querySelectorAll("a.utilities-channelRedirImprove-a");
    wrappers.forEach((wrapper) => {
        const parent = wrapper.parentNode;
        while (wrapper.firstChild) {
            parent.insertBefore(wrapper.firstChild, wrapper);
        }
        wrapper.remove();
    });

    // clean up flags
    const processedNodes = document.querySelectorAll('[data-processing-redir="true"]');
    processedNodes.forEach((node) => {
        delete node.dataset.processingRedir;
    });
}

// utilities: observer to handle dynamic content
function setupUtilitiesObserver() {
    if (!document.body) {
        window.requestAnimationFrame(setupUtilitiesObserver);
        return;
    }

    const observer = new MutationObserver((mutations) => {
        if (mutations.some((m) => m.addedNodes.length > 0)) {
            setTimeout(() => {
                if (isChannelRedirImproveEnabled) processChannelRedirImprove();
            }, 100); // wait for DOM to settle
        }
    });

    observer.observe(document.body, { childList: true, subtree: true });
}

// utilities: init settings on load
initModuleSettings(UTILITIES_DEFAULT_SETTINGS, (settings) => {
    // update global variable
    isChannelRedirImproveEnabled = settings["utilities-channelRedirImprove"] || false;

    applyModuleStyles(settings, utilityStyleSettings);
    processShortsToWatch(settings);
    processNoPlaylistTrap(settings);
    if (isChannelRedirImproveEnabled) processChannelRedirImprove();
    setupUtilitiesObserver();
});

// utilities: listen for storage changes
setupModuleStorageListener(UTILITIES_DEFAULT_SETTINGS, (settings) => {
    // update global variable
    isChannelRedirImproveEnabled = settings["utilities-channelRedirImprove"] || false;

    applyModuleStyles(settings, utilityStyleSettings);
    processShortsToWatch(settings);
    processNoPlaylistTrap(settings);
    if (!isChannelRedirImproveEnabled) removeChannelRedirImprove();
});
