document.addEventListener("DOMContentLoaded", () => {
    // settings for module: utilities
    const utilsSettings = ["utilities-shortsToWatch", "utilities-noPlaylistTrap", "utilities-channelRedirImprove"];

    // init settings on load
    chrome.storage.local.get(utilsSettings, (data) => {
        const defaultUtilsSettings = {};
        utilsSettings.forEach((id) => {
            defaultUtilsSettings[id] = data[id] !== undefined ? data[id] : true;
            const checkbox = document.getElementById(id);
            if (checkbox) {
                checkbox.checked = defaultUtilsSettings[id];
            }
        });

        chrome.storage.local.set(defaultUtilsSettings);
    });

    // update settings
    utilsSettings.forEach((id) => {
        const checkbox = document.getElementById(id);
        if (checkbox) {
            checkbox.addEventListener("change", (event) => {
                const newSettings = { [id]: event.target.checked };
                chrome.storage.local.set(newSettings);
            });
        }
    });
});
