// ui: style settings
const uiStyleSettings = {
    "ui-videosPerRow-home": {
        styleIdDynamic: "ui-videosPerRow-home-custom",
        cssDynamicGen: (isEnabled, settings) => {
            if (!isEnabled) return "";
            const videosPerRow = settings["ui-videosPerRow-home-count"];
            return `#contents.ytd-rich-grid-renderer {
                        --ytd-rich-grid-items-per-row: ${videosPerRow} !important;
                    }`;
        },
    },
    "ui-shortsPerRow-home": {
        styleIdDynamic: "ui-shortsPerRow-home-custom",
        cssDynamicGen: (isEnabled, settings) => {
            if (!isEnabled) return "";
            const shortsPerRow = settings["ui-shortsPerRow-home-count"];
            return `ytd-rich-shelf-renderer[is-shorts] {
                        --ytd-rich-grid-items-per-row: ${shortsPerRow} !important;
                    }`;
        },
    },
    "ui-postsPerRow-home": {
        styleIdDynamic: "ui-postsPerRow-home-custom",
        cssDynamicGen: (isEnabled, settings) => {
            if (!isEnabled) return "";
            const postsPerRow = settings["ui-postsPerRow-home-count"];
            return `ytd-rich-shelf-renderer:not([is-shorts]):has([is-post]) {
                        --ytd-rich-grid-items-per-row: ${postsPerRow} !important;
                    }`;
        },
    },
    "ui-newsPerRow-home": {
        styleIdDynamic: "ui-newsPerRow-home-custom",
        cssDynamicGen: (isEnabled, settings) => {
            if (!isEnabled) return "";
            const newsPerRow = settings["ui-newsPerRow-home-count"];
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
        const shortsPerRowValue = parseInt(settings["ui-shortsPerRow-home-count"], 10); // get setting value

        // only run if setting enabled
        if (!settings["ui-shortsPerRow-home"] || isNaN(shortsPerRowValue) || shortsPerRowValue < 1) {
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
        const postsPerRowValue = parseInt(settings["ui-postsPerRow-home-count"], 10); // get setting value

        // only run if setting enabled
        if (!settings["ui-postsPerRow-home"] || isNaN(postsPerRowValue) || postsPerRowValue < 1) {
            document.querySelectorAll(`${POSTS_SHELVES_SELECTOR} ${POSTS_ITEMS_SELECTOR}[hidden]`).forEach((item) => {
                item.removeAttribute("hidden");
            });
            return;
        }

        const postsShelves = document.querySelectorAll(`${POSTS_SHELVES_SELECTOR}`); // get all posts shelves
        postsShelves.forEach((shelf) => {
            const shelfRenderer = shelf.closest("ytd-rich-shelf-renderer");
            const showLessButton = shelfRenderer ? shelfRenderer.querySelector(POSTS_SHOW_LESS_SELECTOR) : null;
            if (showLessButton) return;

            const shelfChildren = shelf.querySelectorAll(`${POSTS_ITEMS_SELECTOR}`);
            shelfChildren.forEach((item, itemIndex) => {
                if (itemIndex < postsPerRowValue) {
                    if (item.hasAttribute("hidden")) item.removeAttribute("hidden"); // from 0 to N-1
                } else {
                    if (!item.hasAttribute("hidden")) item.setAttribute("hidden", ""); // the rest
                }
            });
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
        const newsPerRowValue = parseInt(settings["ui-newsPerRow-home-count"], 10); // get setting value

        // only run if setting enabled
        if (!settings["ui-newsPerRow-home"] || isNaN(newsPerRowValue) || newsPerRowValue < 1) {
            document.querySelectorAll(`${NEWS_SHELVES_SELECTOR} ${NEWS_ITEMS_SELECTOR}[hidden]`).forEach((item) => {
                item.removeAttribute("hidden");
            });
            return;
        }

        const newsShelves = document.querySelectorAll(`${NEWS_SHELVES_SELECTOR}`); // get all news shelves
        newsShelves.forEach((shelf) => {
            const shelfRenderer = shelf.closest("ytd-rich-shelf-renderer");
            const showLessButton = shelfRenderer ? shelfRenderer.querySelector(NEWS_SHOW_LESS_SELECTOR) : null;
            if (showLessButton) return;

            const shelfChildren = shelf.querySelectorAll(`${NEWS_ITEMS_SELECTOR}`);
            shelfChildren.forEach((item, itemIndex) => {
                if (itemIndex < newsPerRowValue) {
                    if (item.hasAttribute("hidden")) item.removeAttribute("hidden"); // from 0 to N-1
                } else {
                    if (!item.hasAttribute("hidden")) item.setAttribute("hidden", ""); // the rest
                }
            });
        });
    } catch (error) {
        console.error("Failed to apply News display.", error);
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

// ui: check and apply dynamic display
function checkAndApplyDynamicDisplay() {
    initModuleSettings(UI_DEFAULT_SETTINGS, (settings) => {
        processDynamicShortsDisplay(settings);
        processDynamicPostsDisplay(settings);
        processDynamicNewsDisplay(settings);
    });
}

// ui: apply all UI logic based on settings
function applyUILogic(settings) {
    applyModuleStyles(settings, uiStyleSettings);

    processDynamicShortsDisplay(settings);
    processDynamicPostsDisplay(settings);
    processDynamicNewsDisplay(settings);

    if (settings["ui-shortsPerRow-home"]) {
        waitForElementToRender("ytd-rich-shelf-renderer[is-shorts]");
    }
    if (settings["ui-postsPerRow-home"]) {
        waitForElementToRender("ytd-rich-shelf-renderer:not([is-shorts]):has([is-post])");
    }
    if (settings["ui-newsPerRow-home"]) {
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
