// core: inject or update a custom style into DOM
function injectCustomStyle(styleId, cssRules) {
    const existingStyle = document.getElementById(styleId);
    if (existingStyle) {
        if (existingStyle.textContent === cssRules) return; // avoid unnecessary updates
        existingStyle.textContent = cssRules;
    } else {
        const styleElement = document.createElement("style");
        styleElement.id = styleId;
        styleElement.textContent = cssRules;
        (document.head || document.documentElement).appendChild(styleElement);
    }
}

// core: initialize module settings
function initModuleSettings(defaultSettings, callback) {
    const keys = Object.keys(defaultSettings);

    chrome.storage.local.get(keys, (result) => {
        const mergedSettings = {};
        keys.forEach((key) => {
            mergedSettings[key] = result[key] !== undefined ? result[key] : defaultSettings[key]; // use default if not set
        });
        chrome.storage.local.set(mergedSettings); // save merged settings
        callback(mergedSettings);
    });
}

// core: apply styles based on settings
function applyModuleStyles(settings, styleConfig) {
    Object.keys(styleConfig).forEach((key) => {
        const config = styleConfig[key];
        const toggleKey = config.toggleKey || key; // if no toggleKey specified, use the style key itself
        const isEnabled = settings[toggleKey];

        // static values, only inject once
        if (config.styleIdStatic && config.cssStatic) {
            injectCustomStyle(config.styleIdStatic, config.cssStatic);
        }

        // dynamic values, inject based on state
        if (config.styleIdDynamic && config.cssDynamicGen) {
            const css = config.cssDynamicGen(isEnabled, settings);
            injectCustomStyle(config.styleIdDynamic, css);
        }
    });
}

// core: listen for storage changes
function setupModuleStorageListener(defaultSettings, callback) {
    const keys = Object.keys(defaultSettings);

    chrome.storage.onChanged.addListener((changes, namespace) => {
        if (namespace === "local") {
            const relevantChange = keys.some((key) => changes[key] !== undefined); // check relevant changes in a module

            // if module have relevant changes, reload whole module
            if (relevantChange) {
                chrome.storage.local.get(keys, (result) => {
                    const mergedSettings = { ...defaultSettings, ...result };
                    callback(mergedSettings);
                });
            }
        }
    });
}
