// ui: style settings
const uiStyleSettings = {
    "ui-videosPerRow-home": {
        styleIdDynamic: "ui-videosPerRow-home-custom",
        cssDynamicGen: (isEnabled, settings) => {
            if (!isEnabled) return "";
            const videosPerRow = settings["ui-videosPerRow-home-count"];
            return `${MAIN_HOME} {
                        --ytd-rich-grid-items-per-row: ${videosPerRow} !important;
                    }`;
        },
    },
    "ui-shortsPerRow-home": {
        styleIdDynamic: "ui-shortsPerRow-home-custom",
        cssDynamicGen: (isEnabled, settings) => {
            if (!isEnabled) return "";
            const shortsPerRow = settings["ui-shortsPerRow-home-count"];
            return `${SECTION_SHORTSSHELVES} ytd-rich-shelf-renderer {
                        --ytd-rich-grid-items-per-row: ${shortsPerRow} !important;
                    }`;
        },
    },
    "ui-postsPerRow-home": {
        styleIdDynamic: "ui-postsPerRow-home-custom",
        cssDynamicGen: (isEnabled, settings) => {
            if (!isEnabled) return "";
            const postsPerRow = settings["ui-postsPerRow-home-count"];
            return `${SECTION_POSTSSHELVES} ytd-rich-shelf-renderer {
                        --ytd-rich-grid-items-per-row: ${postsPerRow} !important;
                    }`;
        },
    },
    "ui-othersPerRow-home": {
        styleIdDynamic: "ui-othersPerRow-home-custom",
        cssDynamicGen: (isEnabled, settings) => {
            if (!isEnabled) return "";
            const othersPerRow = settings["ui-othersPerRow-home-count"];
            return `${SECTION_OTHERS} ytd-rich-shelf-renderer {
                        --ytd-rich-grid-items-per-row: ${othersPerRow} !important;
                    }`;
        },
    },
};

// ui - shortsPerRow-home: main process
function processShortsPerRow_Home(settings) {
    setItemsPerRow(settings, SECTION_SHORTSSHELVES, "ui-shortsPerRow-home-count", "ui-shortsPerRow-home");
}

// ui - postsPerRow-home: main process
function processPostsPerRow_Home(settings) {
    setItemsPerRow(settings, SECTION_POSTSSHELVES, "ui-postsPerRow-home-count", "ui-postsPerRow-home");
}

// ui - othersPerRow-home: main process
function processOthersPerRow_Home(settings) {
    setItemsPerRow(settings, SECTION_OTHERS, "ui-othersPerRow-home-count", "ui-othersPerRow-home");
}

// ui - shortsPerRow-home, postsPerRow-home, othersPerRow-home: process items per row
function setItemsPerRow(settings, shelfSelector, countKey, toggleKey) {
    try {
        const contentsSelector = `${shelfSelector} ytd-rich-shelf-renderer #contents`;
        const limit = parseInt(settings[countKey], 10);
        const isEnabled = settings[toggleKey];

        // if disabled or error, show all
        if (!isEnabled || isNaN(limit) || limit < 1) {
            document.querySelectorAll(`${contentsSelector} ytd-rich-item-renderer[hidden]`).forEach((item) => {
                item.removeAttribute("hidden");
            });
            return;
        }

        const shelves = document.querySelectorAll(contentsSelector);
        shelves.forEach((shelf) => {
            const children = shelf.querySelectorAll("ytd-rich-item-renderer");
            children.forEach((item, index) => {
                if (index < limit) {
                    if (item.hasAttribute("hidden")) item.removeAttribute("hidden");
                } else {
                    if (!item.hasAttribute("hidden")) item.setAttribute("hidden", "");
                }
            });

            // hide/show "show more" and "show less" buttons
            if (limit > 0 && (shelfSelector === SECTION_POSTSSHELVES || shelfSelector === SECTION_OTHERS)) {
                const shelfRenderer = shelf.closest("ytd-rich-shelf-renderer");
                if (shelfRenderer) {
                    const cssItemsCount = parseInt(window.getComputedStyle(shelfRenderer).getPropertyValue("--ytd-rich-shelf-items-count"), 10);
                    // CHANGE: Use actual children length as fallback if CSS variable is not ready or 0
                    const itemsLoaded = isNaN(cssItemsCount) || cssItemsCount === 0 ? children.length : cssItemsCount; 

                    if (itemsLoaded > 0) {
                        const BTN_SHOW_MORE = 'button:has(path[d*="M18.70"])';
                        const BTN_SHOW_LESS = 'button:has(path[d*="M5.293"])';
                        const showMoreBtn = shelfRenderer.querySelector(BTN_SHOW_MORE);
                        const showLessBtn = shelfRenderer.querySelector(BTN_SHOW_LESS);

                        const shouldHideButtons = itemsLoaded <= limit;
                        if (showMoreBtn) showMoreBtn.style.display = shouldHideButtons ? "none" : "";
                        if (showLessBtn) showLessBtn.style.display = shouldHideButtons ? "none" : "";
                    }
                }
            }
        });
    } catch (error) {
        console.error(`Failed to apply limit for ${shelfSelector}:`, error);
    }
}

// ui - postsPerRow-home, othersPerRow-home: handle "show more" and "show less" buttons
function processShelfButtonListener(shelfSelector, moduleName) {
    if (document.readyState === "loading") {
        window.addEventListener("load", () => initListener(shelfSelector, moduleName));
    } else {
        initListener(shelfSelector, moduleName);
    }

    function initListener(selector, name) {
        const BTN_SHOW_MORE = 'button:has(path[d*="M18.70"])';
        const BTN_SHOW_LESS = 'button:has(path[d*="M5.293"])';
        const BTN_SELECTOR = `${selector} ytd-rich-shelf-renderer ${BTN_SHOW_MORE}, ${selector} ytd-rich-shelf-renderer ${BTN_SHOW_LESS}`;

        const attachListener = (button) => {
            if (!button || button.dataset.listenerAttached) return;

            button.addEventListener("click", () => {
                if (button.matches(BTN_SHOW_LESS)) {
                    setTimeout(() => {
                        checkAndApplyDynamicDisplay();
                    }, 1500); // delay after click
                } else if (button.matches(BTN_SHOW_MORE)) {
                    const shelf = button.closest("ytd-rich-shelf-renderer");
                    if (shelf) {
                        shelf.querySelectorAll("ytd-rich-item-renderer[hidden]").forEach((item) => item.removeAttribute("hidden"));
                    }
                }
            });
            button.dataset.listenerAttached = "true";
        };

        const buttonObserver = new MutationObserver((mutationsList) => {
            for (const mutation of mutationsList) {
                if (mutation.type === "childList") {
                    mutation.addedNodes.forEach((node) => {
                        if (node.nodeType === 1 && node instanceof Element) {
                            const btns = node.matches(BTN_SELECTOR) ? [node] : node.querySelectorAll(BTN_SELECTOR);
                            btns.forEach(attachListener);
                        }
                    });

                    mutation.removedNodes.forEach((node) => {
                        if (node.nodeType === 1 && node instanceof Element) {
                            if (node.matches(BTN_SELECTOR) || node.querySelector(BTN_SELECTOR)) {
                                setTimeout(checkAndApplyDynamicDisplay, 1000);
                            }
                        }
                    });
                }
            }
        });

        buttonObserver.observe(document.body, { childList: true, subtree: true });
        document.querySelectorAll(BTN_SELECTOR).forEach(attachListener);
    }
}

// ui: observer for dynamic settings
function setupDynamicDisplayObserver() {
    if (!document.body) {
        requestAnimationFrame(setupDynamicDisplayObserver);
        return;
    }

    const POSTS_SHELVES_SELECTOR = `${SECTION_POSTSSHELVES} ytd-rich-shelf-renderer #contents`;
    const OTHERS_SHELVES_SELECTOR = `${SECTION_OTHERS} ytd-rich-shelf-renderer #contents`;

    const dynamicDisplayObserver = new MutationObserver((mutationsList, observer) => {
        let shouldApplyDisplay = false;

        for (const mutation of mutationsList) {
            if (mutation.type === "childList") {
                // detect added nodes, shelf added
                if (mutation.addedNodes.length > 0) {
                    for (const node of mutation.addedNodes) {
                        if (node.nodeType === 1 && node.matches("ytd-rich-shelf-renderer")) {
                            shouldApplyDisplay = true;
                            break;
                        }
                    }
                }

                // detect removed nodes, item removed
                if (mutation.removedNodes.length > 0) {
                    for (const node of mutation.removedNodes) {
                        if (
                            node.nodeType === 1 &&
                            node.matches("ytd-rich-item-renderer") &&
                            mutation.target.matches(`${POSTS_SHELVES_SELECTOR}, ${OTHERS_SHELVES_SELECTOR}`)
                        ) {
                            shouldApplyDisplay = true;
                            break;
                        }
                    }
                }
            }

            // detect attribute changes
            if (mutation.type === "attributes" && mutation.attributeName === "hidden") {
                const target = mutation.target;
                if (target.nodeType === 1 && target.matches("ytd-rich-item-renderer")) {
                    const shelf = target.closest("ytd-rich-shelf-renderer");
                    if (shelf) {
                        if (target.hasAttribute("hidden")) {
                            shouldApplyDisplay = true;
                        }
                    }
                }
            }

            if (shouldApplyDisplay) break;
        }

        if (shouldApplyDisplay) {
            // dual delay for SPA reliability
            setTimeout(checkAndApplyDynamicDisplay, 500);
            setTimeout(checkAndApplyDynamicDisplay, 1500);
        }
    });

    const targetNode = document.body;
    const config = { childList: true, subtree: true, attributes: true, attributeFilter: ["hidden"], attributeOldValue: true };
    dynamicDisplayObserver.observe(targetNode, config);
}

// ui: check and apply dynamic display
let isApplyingDisplay = false;
function checkAndApplyDynamicDisplay() {
    if (isApplyingDisplay) return;
    isApplyingDisplay = true;

    initModuleSettings(UI_DEFAULT_SETTINGS, (settings) => {
        processShortsPerRow_Home(settings);
        processPostsPerRow_Home(settings);
        processOthersPerRow_Home(settings);
        isApplyingDisplay = false;
    });
}

// ui: apply all UI logic based on settings
function applyUILogic(settings) {
    applyModuleStyles(settings, uiStyleSettings);

    processShortsPerRow_Home(settings);
    processPostsPerRow_Home(settings);
    processOthersPerRow_Home(settings);

    if (settings["ui-shortsPerRow-home"]) waitForElementToRender(`${SECTION_SHORTSSHELVES} ytd-rich-shelf-renderer`, checkAndApplyDynamicDisplay);
    if (settings["ui-postsPerRow-home"]) waitForElementToRender(`${SECTION_POSTSSHELVES} ytd-rich-shelf-renderer`, checkAndApplyDynamicDisplay);
    if (settings["ui-othersPerRow-home"]) waitForElementToRender(`${SECTION_OTHERS} ytd-rich-shelf-renderer`, checkAndApplyDynamicDisplay);
}

// ui: wait for element to render
function waitForElementToRender(selector, callback = null, maxAttempts = 50, interval = 100) {
    let attempts = 0;
    const checkExist = setInterval(() => {
        attempts++;
        const element = document.querySelector(selector);
        if (element) {
            clearInterval(checkExist);
            if (callback) callback();
        } else if (attempts >= maxAttempts) {
            clearInterval(checkExist);
        }
    }, interval);
}

// ui: init settings on load
initModuleSettings(UI_DEFAULT_SETTINGS, (settings) => {
    applyUILogic(settings);

    // setup listeners
    processShelfButtonListener(SECTION_POSTSSHELVES, "Posts");
    processShelfButtonListener(SECTION_OTHERS, "Others");

    setupDynamicDisplayObserver();
});

// ui: listen for storage changes
setupModuleStorageListener(UI_DEFAULT_SETTINGS, (settings) => {
    applyUILogic(settings);
});
