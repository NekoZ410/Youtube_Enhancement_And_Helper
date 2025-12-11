// utilities: style settings
const utilityStyleSettings = {
    "utilities-shortsToWatch": {
        styleIdStatic: "utilities-shortsToWatch-inject-static",
        cssStatic: `
            ${HOME_ITEMS_SHORTS} div[role="presentation"],
            ${WATCH_SIDEBAR_SHELVES_SHORTS_VIDEOS} div[role="presentation"],
            ${WATCH_SIDEBAR_SHELVES_SHORTS_VIDEOS_ALT} div[role="presentation"] {
                min-height: 72px !important;
            }`,
        styleIdDynamic: "utilities-shortsToWatch-inject-dynamic",
        cssDynamicGen: (isEnabled) => {
            return isEnabled ? `.utilities-shortsToWatch-btn { display: inline-flex !important; }` : `.utilities-shortsToWatch-btn { display: none !important; }`;
        },
    },
    "utilities-noPlaylistTrap": {
        styleIdStatic: "utilities-noPlaylistTrap-inject-static",
        cssStatic: `
            ${HOME_ITEMS_PLAYLIST} .yt-lockup-metadata-view-model__menu-button,
            ${HOME_ITEMS_VIDEOS_PLTRAP} .yt-lockup-metadata-view-model__menu-button,
            ${WATCH_SIDEBAR_VIDEOS_PLTRAP} .yt-lockup-metadata-view-model__menu-button,
            ${WATCH_SIDEBAR_VIDEOS_PLTRAP_ALT} .yt-lockup-metadata-view-model__menu-button {
                position: relative !important;
            }
            ${HOME_ITEMS_PLAYLIST} .yt-lockup-metadata-view-model__menu-button .ytSpecButtonViewModelHost,
            ${HOME_ITEMS_VIDEOS_PLTRAP} .yt-lockup-metadata-view-model__menu-button .ytSpecButtonViewModelHost,
            ${WATCH_SIDEBAR_VIDEOS_PLTRAP} .yt-lockup-metadata-view-model__menu-button .ytSpecButtonViewModelHost,
            ${WATCH_SIDEBAR_VIDEOS_PLTRAP_ALT} .yt-lockup-metadata-view-model__menu-button .ytSpecButtonViewModelHost {
                flex-direction: column !important;
                align-items: center;
            }
            .utilities-noPlaylistTrap-btn {
                display: inline-flex;
            }`,
        styleIdDynamic: "utilities-noPlaylistTrap-inject-dynamic",
        cssDynamicGen: (isEnabled) => {
            return isEnabled ? `.utilities-noPlaylistTrap-btn { display: inline-flex !important; }` : `.utilities-noPlaylistTrap-btn { display: none !important; }`;
        },
    },
    "utilities-channelRedirImprove": {
        styleIdStatic: "utilities-channelRedirImprove-inject-static",
        cssStatic: `
            a.utilities-channelRedirImprove-a {
                text-decoration: none;
                cursor: pointer;
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

// utilities - shortsToWatch: custom button HTML
const SHORTS_TO_VIEW_BTN = `
    <button class="yt-spec-button-shape-next yt-spec-button-shape-next--text yt-spec-button-shape-next--mono yt-spec-button-shape-next--size-m yt-spec-button-shape-next--icon-button yt-spec-button-shape-next--enable-backdrop-filter-experiment utilities-shortsToWatch-btn" title="[Youtube Enhancement And Helper]&#10;Click to watch shorts in '/watch' view.&#10;Middle mouse click to open in new tab.">
        <div aria-hidden="true" class="yt-spec-button-shape-next__icon">
            <span class="ytIconWrapperHost" style="width: 24px; height: 24px;">
                <span class="yt-icon-shape ytSpecIconShapeHost">
                    <div style="width: 100%; height: 100%; display: block; fill: currentcolor;">
                        <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24" aria-hidden="true" style="pointer-events:none;display:inherit;width:100%;height:100%">
                            <path d="m13.467 1.19-8 4.7a5 5 0 0 0-.255 8.46 5 5 0 0 0 5.32 8.462l8-4.7a5 5 0 0 0 .258-8.462 5 5 0 0 0 1.641-6.464l-.12-.217a5 5 0 0 0-6.844-1.78m5.12 2.79a3 3 0 0 1-1.067 4.107l-1.327.78a1 1 0 0 0 .096 1.775l.943.423a3 3 0 0 1 .288 5.323l-8 4.7a3 3 0 0 1-3.039-5.173l1.327-.78a1 1 0 0 0-.097-1.775l-.942-.423a3 3 0 0 1-.288-5.323l8-4.7a3 3 0 0 1 4.106 1.066M15 12l-5-3v6z"></path>
                            <path stroke="#000" stroke-width="2" stroke-linecap="round" d="m2 2 21 21"></path>
                        </svg>
                    </div>
                </span>
            </span>
        </div>
        <yt-touch-feedback-shape aria-hidden="true" class="yt-spec-touch-feedback-shape yt-spec-touch-feedback-shape--touch-response">
            <div class="yt-spec-touch-feedback-shape__stroke"></div>
            <div class="yt-spec-touch-feedback-shape__fill"></div>
        </yt-touch-feedback-shape>
    </button>`;

// utilities - noPlaylistTrap: custom button HTML
const NO_PLAYLIST_TRAP_BTN = `
    <button class="yt-spec-button-shape-next yt-spec-button-shape-next--text yt-spec-button-shape-next--mono yt-spec-button-shape-next--size-m yt-spec-button-shape-next--icon-button yt-spec-button-shape-next--enable-backdrop-filter-experiment utilities-noPlaylistTrap-btn" title="[Youtube Enhancement And Helper]&#10;Click to watch video without trapped into a playlist.&#10;Middle mouse click to open in new tab." aria-disabled="false">
        <div aria-hidden="true" class="yt-spec-button-shape-next__icon">
            <span class="ytIconWrapperHost" style="width: 24px; height: 24px;">
                <span class="yt-icon-shape ytSpecIconShapeHost">
                    <div style="width: 100%; height: 100%; display: block; fill: currentcolor;">
                        <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24" focusable="false" aria-hidden="true" style="pointer-events: none; display: inherit; width: 100%; height: 100%;">
                            <path d="M16 15.395a.5.5 0 0 1 .762-.426L22.5 18.5l-5.738 3.531a.5.5 0 0 1-.762-.425v-6.212ZM14 19H4a1 1 0 1 1 0-2h10zm6-8a1 1 0 1 1 0 2H4a1 1 0 1 1 0-2zm0-6a1 1 0 1 1 0 2H4a1 1 0 0 1 0-2z"/>
                            <path stroke="#000" stroke-width="2" stroke-linecap="round" d="m2 2 21 21"/>
                        </svg>
                    </div>
                </span>
            </span>
        </div>
        <yt-touch-feedback-shape aria-hidden="true" class="yt-spec-touch-feedback-shape yt-spec-touch-feedback-shape--touch-response">
            <div class="yt-spec-touch-feedback-shape__stroke"></div>
            <div class="yt-spec-touch-feedback-shape__fill"></div>
        </yt-touch-feedback-shape>
    </button>`;

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
function processShortsToWatch() {
    const shortsContainerEl = `${HOME_ITEMS_SHORTS}, ${WATCH_SIDEBAR_SHELVES_SHORTS_VIDEOS}, ${WATCH_SIDEBAR_SHELVES_SHORTS_VIDEOS_ALT}`;
    const targetNodes = document.querySelectorAll(shortsContainerEl);

    targetNodes.forEach((node) => {
        // find and convert video URL
        const linkSource = node.querySelector(".reel-item-endpoint");
        if (!linkSource || !linkSource.href) return;
        const cleanUrl = linkSource.href.replace(/\/shorts\//, "/watch/");

        // find menu container
        const menuContainer = node.querySelector(".shortsLockupViewModelHostOutsideMetadataMenu");
        if (!menuContainer) return;

        // process button
        if (menuContainer.querySelector(".utilities-shortsToWatch-btn")) return; // prevent duplicates
        const tempDiv = document.createElement("div");
        tempDiv.innerHTML = SHORTS_TO_VIEW_BTN.trim();
        const customButton = tempDiv.firstChild;

        customButton.addEventListener("click", (e) => {
            e.preventDefault();
            e.stopPropagation();
            window.location.href = cleanUrl;
        });

        customButton.addEventListener("mousedown", (e) => {
            // middle mouse
            if (e.button === 1) {
                e.preventDefault();
                e.stopPropagation();

                chrome.runtime.sendMessage({
                    action: "openBackgroundTab",
                    url: cleanUrl,
                });
            }
        });

        menuContainer.appendChild(customButton);
    });
}

// utilities - noPlaylistTrap: main processing
function processNoPlaylistTrap() {
    const plContainerEl = `${HOME_ITEMS_PLAYLIST}, ${HOME_ITEMS_VIDEOS_PLTRAP}, ${WATCH_SIDEBAR_VIDEOS_PLTRAP}, ${WATCH_SIDEBAR_VIDEOS_PLTRAP_ALT}`;
    const targetNodes = document.querySelectorAll(plContainerEl);

    targetNodes.forEach((node) => {
        // find and extract video URL
        const linkSource = node.querySelector(".yt-lockup-view-model__content-image");
        if (!linkSource || !linkSource.href) return;
        const match = linkSource.href.match(PATTERN_YT_VIDEO_URL);
        const cleanUrl = match ? match[0] : null;
        if (!cleanUrl) return;

        // find menu container
        const menuContainer = node.querySelector(".yt-lockup-metadata-view-model__menu-button .ytSpecButtonViewModelHost");
        if (!menuContainer) return;

        // process button
        if (menuContainer.querySelector(".utilities-noPlaylistTrap-btn")) return; // prevent duplicates
        const tempDiv = document.createElement("div");
        tempDiv.innerHTML = NO_PLAYLIST_TRAP_BTN.trim();
        const customButton = tempDiv.firstChild;

        customButton.addEventListener("click", (e) => {
            e.preventDefault();
            e.stopPropagation();
            window.location.href = cleanUrl;
        });

        customButton.addEventListener("mousedown", (e) => {
            // middle mouse
            if (e.button === 1) {
                e.preventDefault();
                e.stopPropagation();

                chrome.runtime.sendMessage({
                    action: "openBackgroundTab",
                    url: cleanUrl,
                });
            }
        });

        menuContainer.appendChild(customButton);
    });
}

// utilities - channelRedirImprove: main processing
function processChannelRedirImprove() {
    // process home avatars
    const homeNodes = document.querySelectorAll(HOME_ITEMS_VIDEOS);
    homeNodes.forEach((node) => {
        const channelLinkEl = node.querySelector(".yt-core-attributed-string__link");
        const avatarEl = node.querySelector(".ytDecoratedAvatarViewModelHost");

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
    const sidebarSelector = `${WATCH_SIDEBAR_VIDEOS}, ${WATCH_SIDEBAR_VIDEOS_ALT}`;
    const sidebarNodes = document.querySelectorAll(sidebarSelector);

    sidebarNodes.forEach(async (node) => {
        const videoLinkEl = node.querySelector(".yt-lockup-view-model__content-image");
        const textElements = node.querySelectorAll(".yt-core-attributed-string");
        const channelNameEl = textElements[1];

        if (videoLinkEl && videoLinkEl.href && channelNameEl) {
            if (channelNameEl.parentNode.classList.contains("utilities-channelRedirImprove-a")) return; // prevent duplicates

            const match = videoLinkEl.href.match(PATTERN_YT_VIDEO_URL);
            const cleanVideoUrl = match ? match[0] : null;
            if (cleanVideoUrl) {
                if (node.dataset.processingRedir) return; // prevent duplicates
                node.dataset.processingRedir = "true";

                const channelUrl = await getChannelUrlFromOembed(cleanVideoUrl);
                if (channelUrl) {
                    const wrapper = document.createElement("a");
                    wrapper.href = channelUrl;
                    wrapper.className = "utilities-channelRedirImprove-a";
                    wrapper.onclick = (e) => e.stopPropagation();

                    channelNameEl.parentNode.insertBefore(wrapper, channelNameEl);
                    wrapper.appendChild(channelNameEl);
                }
            }
        }
    });
}

// utilities: observer to handle dynamic content
function setupUtilitiesObserver() {
    if (!document.body) {
        window.requestAnimationFrame(setupUtilitiesObserver);
        return;
    }

    const observer = new MutationObserver((mutations) => {
        let shouldProcess = false;
        for (const mutation of mutations) {
            if (mutation.type === "childList" && mutation.addedNodes.length > 0) {
                shouldProcess = true;
                break;
            }
        }

        if (shouldProcess) {
            setTimeout(() => {
                try {
                    if (!chrome.runtime.id) throw new Error("Context invalidated");
                } catch (e) {
                    observer.disconnect();
                    return;
                }

                processShortsToWatch();
                processNoPlaylistTrap();
                if (isChannelRedirImproveEnabled) {
                    processChannelRedirImprove();
                }
            }, 100); // wait for DOM to settle
        }
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true,
    });
}

// utilities: init settings on load
initModuleSettings(UTILITIES_DEFAULT_SETTINGS, (settings) => {
    // update global variable
    if (settings["utilities-channelRedirImprove"] !== undefined) {
        isChannelRedirImproveEnabled = settings["utilities-channelRedirImprove"];
    }

    applyModuleStyles(settings, utilityStyleSettings);
    processShortsToWatch();
    processNoPlaylistTrap();
    if (isChannelRedirImproveEnabled) processChannelRedirImprove();
    setupUtilitiesObserver();
});

// utilities: listen for storage changes
setupModuleStorageListener(UTILITIES_DEFAULT_SETTINGS, (settings) => {
    // update global variable
    if (settings["utilities-channelRedirImprove"] !== undefined) {
        isChannelRedirImproveEnabled = settings["utilities-channelRedirImprove"];
        // re-process if enabled
        if (isChannelRedirImproveEnabled) processChannelRedirImprove();
    }

    applyModuleStyles(settings, utilityStyleSettings);
});
