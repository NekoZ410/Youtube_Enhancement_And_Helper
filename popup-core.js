// core: display info from manifest
(function () {
    const manifest = chrome.runtime.getManifest(); // get manifest object
    const versionElement = document.getElementById("ext-ver");
    if (versionElement) versionElement.textContent = manifest.version; // extension version
    const nameElement = document.getElementById("ext-name");
    if (nameElement) nameElement.textContent = manifest.name; // extension name
    document.title = manifest.name; // set popup HTML title
    const repoLink = document.getElementById("ext-repo");
    if (repoLink && manifest.homepage_url) repoLink.href = manifest.homepage_url; // extension repo URL
})();

// core: send message to update styles
function sendUpdateStylesMessage(changedId = null) {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (tabs[0] && tabs[0].url && tabs[0].url.includes("youtube.com")) {
            const message = { message: "update_styles" };
            if (changedId) {
                message.changedId = changedId;
            }

            chrome.tabs.sendMessage(tabs[0].id, message, (response) => {
                if (chrome.runtime.lastError) {
                    // silently fail if content script is not injected
                }
            });
        }
    });
}

// core: initialize popup settings
function initPopupSettings(defaultSettings) {
    const keys = Object.keys(defaultSettings);
    chrome.storage.local.get(keys, (savedSettings) => {
        const currentSettings = { ...defaultSettings, ...savedSettings }; // merge default with saved settings

        // Bind UI Elements
        keys.forEach((id) => {
            const element = document.getElementById(id);
            if (!element) return;

            // set initial values
            if (element.type === "checkbox") {
                element.checked = currentSettings[id];
                const controlledInputId = id.replace("-toggle", "");
                const controlledInput = document.getElementById(controlledInputId);
                if (controlledInput && id.endsWith("-toggle")) {
                    controlledInput.disabled = !element.checked;
                }
            } else {
                element.value = currentSettings[id];
            }

            // bind change event
            element.addEventListener("change", (e) => {
                let value;
                if (element.type === "checkbox") {
                    value = e.target.checked;
                    const controlledInputId = id.replace("-toggle", "");
                    const controlledInput = document.getElementById(controlledInputId);
                    if (controlledInput && id.endsWith("-toggle")) {
                        controlledInput.disabled = !value;
                    }
                } else if (element.type === "number") {
                    value = parseFloat(e.target.value);
                } else {
                    value = e.target.value;
                }

                // save and send update message
                chrome.storage.local.set({ [id]: value }, () => {
                    if (typeof sendUpdateStylesMessage === "function") {
                        sendUpdateStylesMessage(id);
                    }
                });
            });
        });
    });
}
