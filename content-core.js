// global: inject or update a custom style into DOM
function injectCustomStyle(styleId, cssRules) {
    const existingStyle = document.getElementById(styleId);
    if (existingStyle) {
        existingStyle.remove();
    }

    const styleElement = document.createElement("style");
    styleElement.id = styleId;
    styleElement.textContent = cssRules;
    (document.head || document.documentElement).appendChild(styleElement);
}

// global: remove all styles from DOM
function removeAllStyles(styleSettings) {
    Object.values(styleSettings).forEach(({ styleId }) => {
        const style = document.getElementById(styleId);
        if (style) {
            style.remove();
        }
    });
}

// global: apply styles based on settings
function applyStyles(settings, styleSettings) {
    removeAllStyles(styleSettings);
    Object.keys(styleSettings).forEach((id) => {
        if (settings[id] === true) {
            const { styleId, css } = styleSettings[id];
            injectCustomStyle(styleId, css);
        }
    });
}

// global: listen for storage changes
function setupStorageListener(styleSettings) {
    chrome.storage.onChanged.addListener((changes, namespace) => {
        if (namespace === "local") {
            const changedSettings = {};
            let hasRelevantChange = false;
            Object.keys(changes).forEach((key) => {
                if (styleSettings[key]) {
                    changedSettings[key] = changes[key].newValue;
                    hasRelevantChange = true;
                }
            });
            if (hasRelevantChange) {
                chrome.storage.local.get(Object.keys(styleSettings), (fullSettings) => {
                    applyStyles(fullSettings, styleSettings);
                });
            }
        }
    });
}
