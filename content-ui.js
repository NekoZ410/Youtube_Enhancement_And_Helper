// ui: style settings
const uiStyleSettings = {
    "ui-videosPerRow-home": {
        toggleKey: "ui-videosPerRow-home-toggle",
        styleIdDynamic: "ui-videosPerRow-home-custom",
        cssDynamicGen: (isEnabled, settings) => {
            if (!isEnabled) return "";
            const videosPerRow = settings["ui-videosPerRow-home"];
            return `#contents.ytd-rich-grid-renderer {
                        --ytd-rich-grid-items-per-row: ${videosPerRow} !important;
                    }`;
        },
    },
    "ui-shortsPerRow-home": {
        toggleKey: "ui-shortsPerRow-home-toggle",
        styleIdDynamic: "ui-shortsPerRow-home-custom",
        cssDynamicGen: (isEnabled, settings) => {
            if (!isEnabled) return "";
            const shortsPerRow = settings["ui-shortsPerRow-home"];
            return `ytd-rich-shelf-renderer[is-shorts] {
                        --ytd-rich-grid-items-per-row: ${shortsPerRow} !important;
                    }`;
        },
    },
    "ui-postsPerRow-home": {
        toggleKey: "ui-postsPerRow-home-toggle",
        styleIdDynamic: "ui-postsPerRow-home-custom",
        cssDynamicGen: (isEnabled, settings) => {
            if (!isEnabled) return "";
            const postsPerRow = settings["ui-postsPerRow-home"];
            return `ytd-rich-shelf-renderer:not([is-shorts]):has([is-post]) {
                        --ytd-rich-grid-items-per-row: ${postsPerRow} !important;
                    }`;
        },
    },
    "ui-newsPerRow-home": {
        toggleKey: "ui-newsPerRow-home-toggle",
        styleIdDynamic: "ui-newsPerRow-home-custom",
        cssDynamicGen: (isEnabled, settings) => {
            if (!isEnabled) return "";
            const newsPerRow = settings["ui-newsPerRow-home"];
            return `ytd-rich-shelf-renderer:not([is-shorts]):not(:has([is-post])) {
                        --ytd-rich-grid-items-per-row: ${newsPerRow} !important;
                    }`;
        },
    },
};

// ui: dynamic shorts display based on setting value
function processDynamicShortsDisplay(settings) {
    try {
        const SHORTS_SHELVES_SELECTOR = "ytd-rich-shelf-renderer[is-shorts] #contents";
        const SHORTS_ITEMS_SELECTOR = "ytd-rich-item-renderer";
        const shortsPerRowValue = parseInt(settings["ui-shortsPerRow-home"], 10); // get setting value

        // only run if setting enabled
        if (!settings["ui-shortsPerRow-home-toggle"] || isNaN(shortsPerRowValue) || shortsPerRowValue < 1) {
            // else show all
            document.querySelectorAll(`${SHORTS_SHELVES_SELECTOR} ${SHORTS_ITEMS_SELECTOR}[hidden]`).forEach((item) => {
                item.removeAttribute("hidden");
            });
            return;
        }

        const shortsShelves = document.querySelectorAll(`${SHORTS_SHELVES_SELECTOR}`); // get all shorts shelves
        shortsShelves.forEach((shelf) => {
            const shelfChildren = shelf.querySelectorAll(`${SHORTS_ITEMS_SELECTOR}`);
            shelfChildren.forEach((item, itemIndex) => {
                if (itemIndex < shortsPerRowValue) {
                    if (item.hasAttribute("hidden")) {
                        item.removeAttribute("hidden"); // from 0 to N-1
                    }
                } else {
                    if (!item.hasAttribute("hidden")) {
                        item.setAttribute("hidden", ""); // the rest
                    }
                }
            });
        });
    } catch (error) {
        console.error("Failed to apply Shorts display.", error);
    }
}

// ui: dynamic posts display based on setting value
function processDynamicPostsDisplay(settings) {
    try {
        const POSTS_SHELVES_SELECTOR = "ytd-rich-shelf-renderer:not([is-shorts]):has([is-post]) #contents";
        const POSTS_ITEMS_SELECTOR = "ytd-rich-item-renderer";
        const POSTS_SHOW_LESS_SELECTOR = 'ytd-rich-shelf-renderer:not([is-shorts]):has([is-post]) [aria-label="Show less"]';
        const postsPerRowValue = parseInt(settings["ui-postsPerRow-home"], 10); // get setting value

        // console.log("DEBUG: dynamicPostsDisplay called with value:", postsPerRowValue);

        // only run if setting enabled
        if (!settings["ui-postsPerRow-home-toggle"] || isNaN(postsPerRowValue) || postsPerRowValue < 1) {
            // else show all
            document.querySelectorAll(`${POSTS_SHELVES_SELECTOR} ${POSTS_ITEMS_SELECTOR}[hidden]`).forEach((item) => {
                item.removeAttribute("hidden");
            });
            // console.log("DEBUG: Posts toggle off or invalid value, showing all");
            return;
        }

        const postsShelves = document.querySelectorAll(`${POSTS_SHELVES_SELECTOR}`); // get all posts shelves
        // console.log("DEBUG: Posts shelves found:", postsShelves.length);
        postsShelves.forEach((shelf, shelfIndex) => {
            const shelfRenderer = shelf.closest("ytd-rich-shelf-renderer");
            const showLessButton = shelfRenderer ? shelfRenderer.querySelector(POSTS_SHOW_LESS_SELECTOR) : null;
            const hasShowLess = !!showLessButton;
            // console.log(`DEBUG: Posts shelf ${shelfIndex}: has show less button: ${hasShowLess}`);

            // only apply hidden limit if not expanded
            if (hasShowLess) {
                // console.log(`DEBUG: Posts shelf ${shelfIndex} is expanded (has show less), skipping limit`);
                return; // else show all
            }

            const shelfChildren = shelf.querySelectorAll(`${POSTS_ITEMS_SELECTOR}`);
            // console.log(`DEBUG: Posts shelf ${shelfIndex} children count: ${shelfChildren.length}`);
            let hiddenCountBefore = 0;
            shelfChildren.forEach((item) => {
                if (item.hasAttribute("hidden")) hiddenCountBefore++;
            });
            // console.log(`DEBUG: Posts shelf ${shelfIndex} hidden before: ${hiddenCountBefore}`);

            shelfChildren.forEach((item, itemIndex) => {
                if (itemIndex < postsPerRowValue) {
                    if (item.hasAttribute("hidden")) {
                        item.removeAttribute("hidden"); // from 0 to N-1
                    }
                } else {
                    if (!item.hasAttribute("hidden")) {
                        item.setAttribute("hidden", ""); // the rest
                    }
                }
            });

            let hiddenCountAfter = 0;
            shelfChildren.forEach((item) => {
                if (item.hasAttribute("hidden")) hiddenCountAfter++;
            });
            // console.log(`DEBUG: Posts shelf ${shelfIndex} hidden after: ${hiddenCountAfter}, expected hidden: ${shelfChildren.length - postsPerRowValue}`);
        });
    } catch (error) {
        console.error("Failed to apply Posts display.", error);
    }
}

// ui: dynamic news display based on setting value
function processDynamicNewsDisplay(settings) {
    try {
        const NEWS_SHELVES_SELECTOR = "ytd-rich-shelf-renderer:not([is-shorts]):not(:has([is-post])) #contents";
        const NEWS_ITEMS_SELECTOR = "ytd-rich-item-renderer";
        const NEWS_SHOW_LESS_SELECTOR = 'ytd-rich-shelf-renderer:not([is-shorts]):not(:has([is-post])) [aria-label="Show less"]';
        const newsPerRowValue = parseInt(settings["ui-newsPerRow-home"], 10); // get setting value

        // console.log("DEBUG: dynamicNewsDisplay called with value:", newsPerRowValue);

        // only run if setting enabled
        if (!settings["ui-newsPerRow-home-toggle"] || isNaN(newsPerRowValue) || newsPerRowValue < 1) {
            // else show all
            document.querySelectorAll(`${NEWS_SHELVES_SELECTOR} ${NEWS_ITEMS_SELECTOR}[hidden]`).forEach((item) => {
                item.removeAttribute("hidden");
            });
            // console.log("DEBUG: News toggle off or invalid value, showing all");
            return;
        }

        const newsShelves = document.querySelectorAll(`${NEWS_SHELVES_SELECTOR}`); // get all news shelves
        // console.log("DEBUG: News shelves found:", newsShelves.length);
        newsShelves.forEach((shelf, shelfIndex) => {
            const shelfRenderer = shelf.closest("ytd-rich-shelf-renderer");
            const showLessButton = shelfRenderer ? shelfRenderer.querySelector(NEWS_SHOW_LESS_SELECTOR) : null;
            const hasShowLess = !!showLessButton;
            // console.log(`DEBUG: News shelf ${shelfIndex}: has show less button: ${hasShowLess}`);

            // only apply hidden limit if not expanded
            if (hasShowLess) {
                // console.log(`DEBUG: News shelf ${shelfIndex} is expanded (has show less), skipping limit`);
                return; // else show all
            }

            const shelfChildren = shelf.querySelectorAll(`${NEWS_ITEMS_SELECTOR}`);
            // console.log(`DEBUG: News shelf ${shelfIndex} children count: ${shelfChildren.length}`);
            let hiddenCountBefore = 0;
            shelfChildren.forEach((item) => {
                if (item.hasAttribute("hidden")) hiddenCountBefore++;
            });
            // console.log(`DEBUG: News shelf ${shelfIndex} hidden before: ${hiddenCountBefore}`);

            shelfChildren.forEach((item, itemIndex) => {
                if (itemIndex < newsPerRowValue) {
                    if (item.hasAttribute("hidden")) {
                        item.removeAttribute("hidden"); // from 0 to N-1
                    }
                } else {
                    if (!item.hasAttribute("hidden")) {
                        item.setAttribute("hidden", ""); // the rest
                    }
                }
            });

            let hiddenCountAfter = 0;
            shelfChildren.forEach((item) => {
                if (item.hasAttribute("hidden")) hiddenCountAfter++;
            });
            // console.log(`DEBUG: News shelf ${shelfIndex} hidden after: ${hiddenCountAfter}, expected hidden: ${shelfChildren.length - newsPerRowValue}`);
        });
    } catch (error) {
        console.error("Failed to apply News display.", error);
    }
}

// ui: check and apply dynamic display
function checkAndApplyDynamicDisplay() {
    try {
        // console.log("DEBUG: Starting checkAndApplyDynamicDisplay");
        chrome.storage.local.get(
            ["ui-shortsPerRow-home-toggle", "ui-shortsPerRow-home", "ui-postsPerRow-home-toggle", "ui-postsPerRow-home", "ui-newsPerRow-home-toggle", "ui-newsPerRow-home"],
            (settings) => {
                const defaultSettings = {
                    "ui-shortsPerRow-home-toggle": true,
                    "ui-shortsPerRow-home": 5,
                    "ui-postsPerRow-home-toggle": true,
                    "ui-postsPerRow-home": 3,
                    "ui-newsPerRow-home-toggle": true,
                    "ui-newsPerRow-home": 3,
                };
                const currentSettings = { ...defaultSettings, ...settings };

                // console.log("DEBUG: Applying dynamic display with settings:", currentSettings);
                processDynamicShortsDisplay(currentSettings);
                processDynamicPostsDisplay(currentSettings);
                processDynamicNewsDisplay(currentSettings);
                // console.log("DEBUG: Finished applying dynamic display");
            }
        );
    } catch (error) {
        console.error("Failed to apply dynamic display due to extension context issue:", error);
    }
}

// ui: handle posts "show less" button
function setupPostsShowLessListener() {
    // wait for page to load before adding listener
    if (document.readyState === "loading") {
        window.addEventListener("load", initPostsListener);
    } else {
        initPostsListener();
    }

    function initPostsListener() {
        // console.log("DEBUG: Initializing posts show less listener after page load");
        const POSTS_SHOW_LESS_SELECTOR = 'ytd-rich-shelf-renderer:not([is-shorts]):has([is-post]) [aria-label="Show less"]';
        // console.log("DEBUG: Using posts show less selector:", POSTS_SHOW_LESS_SELECTOR);

        // set up mutation observer for posts
        const buttonObserver = new MutationObserver((mutationsList) => {
            for (const mutation of mutationsList) {
                if (mutation.type === "childList") {
                    // detect added nodes
                    mutation.addedNodes.forEach((node) => {
                        if (node.nodeType === 1 && node instanceof Element) {
                            let button = null;
                            if (node.matches(POSTS_SHOW_LESS_SELECTOR)) {
                                button = node;
                            } else if (node.querySelector) {
                                try {
                                    button = node.querySelector(POSTS_SHOW_LESS_SELECTOR);
                                } catch (error) {
                                    console.error("Error querying selector on added node for posts:", error);
                                }
                            }

                            if (button && button instanceof Element && !button.dataset.listenerAttached) {
                                // console.log("DEBUG: Detected new posts show less button:", button);
                                try {
                                    button.addEventListener("click", (event) => {
                                        // console.log("DEBUG: Posts show less button clicked:", button, event);
                                        setTimeout(() => {
                                            checkAndApplyDynamicDisplay();
                                        }, 5000); // delay 5s to apply limit to avoid false positives
                                    });
                                    button.dataset.listenerAttached = "true"; // raise flag to avoid attaching listener multiple times
                                    // console.log("DEBUG: Attached listener to posts show less button:", button);
                                } catch (error) {
                                    console.error("Failed to attach listener to posts button:", button, error);
                                }
                            }
                        }
                    });

                    // detect removed nodes
                    mutation.removedNodes.forEach((node) => {
                        if (node.nodeType === 1 && node instanceof Element) {
                            let button = null;
                            if (node.matches(POSTS_SHOW_LESS_SELECTOR)) {
                                button = node;
                            } else if (node.querySelector) {
                                try {
                                    button = node.querySelector(POSTS_SHOW_LESS_SELECTOR);
                                } catch (error) {
                                    console.error("Error querying selector on removed node for posts:", error);
                                }
                            }
                            if (button && button instanceof Element) {
                                // console.log("DEBUG: Posts show less button removed:", button);
                                setTimeout(() => {
                                    checkAndApplyDynamicDisplay();
                                }, 1000); // delay 1s to apply limit to avoid false positives
                            }
                        }
                    });
                }
            }
        });
        buttonObserver.observe(document.body, { childList: true, subtree: true });

        // check for existing buttons immediately
        const existingButtons = document.querySelectorAll(POSTS_SHOW_LESS_SELECTOR);
        // console.log("DEBUG: Found existing posts show less buttons:", existingButtons.length);
        existingButtons.forEach((button) => {
            if (button && button instanceof Element && !button.dataset.listenerAttached) {
                try {
                    button.addEventListener("click", (event) => {
                        // console.log("DEBUG: Existing posts show less button clicked:", button, event);
                        setTimeout(() => {
                            checkAndApplyDynamicDisplay();
                        }, 5000); // delay 5s to apply limit to avoid false positives
                    });
                    button.dataset.listenerAttached = "true"; // raise flag to avoid attaching listener multiple times
                    // console.log("DEBUG: Attached listener to existing posts show less button:", button);
                } catch (error) {
                    console.error("Failed to attach listener to existing posts button:", button, error);
                }
            }
        });
    }
}

// ui: handle news "show less" button
function setupNewsShowLessListener() {
    // wait for page to load before adding listener
    if (document.readyState === "loading") {
        window.addEventListener("load", initNewsListener);
    } else {
        initNewsListener();
    }

    function initNewsListener() {
        // console.log("DEBUG: Initializing news show less listener after page load");
        const NEWS_SHOW_LESS_SELECTOR = 'ytd-rich-shelf-renderer:not([is-shorts]):not(:has([is-post])) [aria-label="Show less"]';
        // console.log("DEBUG: Using news show less selector:", NEWS_SHOW_LESS_SELECTOR);

        // set up mutation observer for news
        const buttonObserver = new MutationObserver((mutationsList) => {
            for (const mutation of mutationsList) {
                if (mutation.type === "childList") {
                    // detect added nodes
                    mutation.addedNodes.forEach((node) => {
                        if (node.nodeType === 1 && node instanceof Element) {
                            let button = null;
                            if (node.matches(NEWS_SHOW_LESS_SELECTOR)) {
                                button = node;
                            } else if (node.querySelector) {
                                try {
                                    button = node.querySelector(NEWS_SHOW_LESS_SELECTOR);
                                } catch (error) {
                                    console.error("Error querying selector on added node for news:", error);
                                }
                            }

                            if (button && button instanceof Element && !button.dataset.listenerAttached) {
                                // console.log("DEBUG: Detected new news show less button:", button);
                                try {
                                    button.addEventListener("click", (event) => {
                                        // console.log("DEBUG: News show less button clicked:", button, event);
                                        setTimeout(() => {
                                            checkAndApplyDynamicDisplay();
                                        }, 5000); // delay 5s to apply limit to avoid false positives
                                    });
                                    button.dataset.listenerAttached = "true"; // raise flag to avoid attaching listener multiple times
                                    // console.log("DEBUG: Attached listener to news show less button:", button);
                                } catch (error) {
                                    console.error("Failed to attach listener to news button:", button, error);
                                }
                            }
                        }
                    });

                    // detect removed nodes
                    mutation.removedNodes.forEach((node) => {
                        if (node.nodeType === 1 && node instanceof Element) {
                            let button = null;
                            if (node.matches(NEWS_SHOW_LESS_SELECTOR)) {
                                button = node;
                            } else if (node.querySelector) {
                                try {
                                    button = node.querySelector(NEWS_SHOW_LESS_SELECTOR);
                                } catch (error) {
                                    console.error("Error querying selector on removed node for news:", error);
                                }
                            }

                            if (button && button instanceof Element) {
                                // console.log("DEBUG: News show less button removed:", button);
                                setTimeout(() => {
                                    checkAndApplyDynamicDisplay();
                                }, 1000); // delay 1s to apply limit to avoid false positives
                            }
                        }
                    });
                }
            }
        });
        buttonObserver.observe(document.body, { childList: true, subtree: true });

        // check for existing buttons immediately
        const existingButtons = document.querySelectorAll(NEWS_SHOW_LESS_SELECTOR);
        // console.log("DEBUG: Found existing news show less buttons:", existingButtons.length);
        existingButtons.forEach((button) => {
            if (button && button instanceof Element && !button.dataset.listenerAttached) {
                try {
                    button.addEventListener("click", (event) => {
                        // console.log("DEBUG: Existing news show less button clicked:", button, event);
                        setTimeout(() => {
                            checkAndApplyDynamicDisplay();
                        }, 5000); // delay 5s to apply limit to avoid false positives
                    });
                    button.dataset.listenerAttached = "true"; // raise flag to avoid attaching listener multiple times
                    // console.log("DEBUG: Attached listener to existing news show less button:", button);
                } catch (error) {
                    console.error("Failed to attach listener to existing news button:", button, error);
                }
            }
        });
    }
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

// ui: observer for dynamic settings
function setupDynamicDisplayObserver() {
    if (!document.body) {
        requestAnimationFrame(setupDynamicDisplayObserver);
        return;
    }

    const SHELVES_SELECTOR = "ytd-rich-shelf-renderer";
    const ITEMS_SELECTOR = "ytd-rich-item-renderer";
    const POSTS_SHELVES_SELECTOR = "ytd-rich-shelf-renderer:not([is-shorts]):has([is-post]) #contents";
    const NEWS_SHELVES_SELECTOR = "ytd-rich-shelf-renderer:not([is-shorts]):not(:has([is-post])) #contents";

    const dynamicDisplayObserver = new MutationObserver((mutationsList, observer) => {
        let shouldApplyDisplay = false;

        for (const mutation of mutationsList) {
            if (mutation.type === "childList") {
                // detect added nodes, shelf added
                if (mutation.addedNodes.length > 0) {
                    for (const node of mutation.addedNodes) {
                        if (node.nodeType === 1 && node.matches(SHELVES_SELECTOR)) {
                            shouldApplyDisplay = true;
                            break;
                        }
                    }
                }

                // detect removed nodes, item removed
                if (mutation.removedNodes.length > 0) {
                    for (const node of mutation.removedNodes) {
                        if (node.nodeType === 1 && node.matches(ITEMS_SELECTOR) && mutation.target.matches(`${POSTS_SHELVES_SELECTOR}, ${NEWS_SHELVES_SELECTOR}`)) {
                            shouldApplyDisplay = true;
                            break;
                        }
                    }
                }
            }

            if (mutation.type === "attributes" && mutation.attributeName === "hidden") {
                const target = mutation.target;
                if (target.nodeType === 1 && target.matches(ITEMS_SELECTOR)) {
                    const shelf = target.closest("ytd-rich-shelf-renderer");
                    if (
                        shelf &&
                        ((shelf.matches("ytd-rich-shelf-renderer:not([is-shorts]):has([is-post])") && mutation.target.closest(POSTS_SHELVES_SELECTOR)) ||
                            (shelf.matches("ytd-rich-shelf-renderer:not([is-shorts]):not(:has([is-post]))") && mutation.target.closest(NEWS_SHELVES_SELECTOR)))
                    ) {
                        if (mutation.oldValue === null && target.hasAttribute("hidden")) {
                            shouldApplyDisplay = true;
                            // console.log("DEBUG: Hidden attribute added to item, triggering apply");
                        }
                    }
                }
            }
            if (shouldApplyDisplay) {
                break;
            }
        }

        if (shouldApplyDisplay) {
            // console.log("DEBUG: Observer triggered apply");
            setTimeout(checkAndApplyDynamicDisplay, 500);
            setTimeout(checkAndApplyDynamicDisplay, 2000);
        }
    });

    const targetNode = document.body;
    const config = {
        childList: true,
        subtree: true,
        attributes: true,
        attributeFilter: ["hidden"],
    };
    dynamicDisplayObserver.observe(targetNode, config);
}
setupDynamicDisplayObserver();

// ui: apply all UI logic based on settings
function applyUILogic(settings) {
    // apply styles
    applyModuleStyles(settings, uiStyleSettings);

    // handle dynamic display
    processDynamicShortsDisplay(settings);
    processDynamicPostsDisplay(settings);
    processDynamicNewsDisplay(settings);

    // init listeners
    if (settings["ui-shortsPerRow-home-toggle"]) {
        waitForElementToRender("ytd-rich-shelf-renderer[is-shorts]");
    }
    if (settings["ui-postsPerRow-home-toggle"]) {
        waitForElementToRender("ytd-rich-shelf-renderer:not([is-shorts]):has([is-post])");
    }
    if (settings["ui-newsPerRow-home-toggle"]) {
        waitForElementToRender("ytd-rich-shelf-renderer:not([is-shorts]):not(:has([is-post]))");
    }
}

// ui: init settings on load
initModuleSettings(UI_DEFAULT_SETTINGS, (settings) => {
    applyUILogic(settings);

    // setup listeners
    setupPostsShowLessListener();
    setupNewsShowLessListener();
    setupDynamicDisplayObserver();
});

// ui: listen for storage changes
setupModuleStorageListener(UI_DEFAULT_SETTINGS, (settings) => {
    applyUILogic(settings);
});

// ui: check and apply dynamic display
function checkAndApplyDynamicDisplay() {
    initModuleSettings(UI_DEFAULT_SETTINGS, (settings) => {
        processDynamicShortsDisplay(settings);
        processDynamicPostsDisplay(settings);
        processDynamicNewsDisplay(settings);
    });
}
