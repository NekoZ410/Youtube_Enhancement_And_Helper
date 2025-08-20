// global: display version from manifest
function displayVersion() {
    const manifest = chrome.runtime.getManifest();
    document.getElementById("version").textContent = manifest.version;
}
displayVersion();

// global: send message to update styles
function sendUpdateStylesMessage(changedId = null) {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (tabs[0]?.url.includes("youtube.com")) {
            const message = { message: "update_styles" };
            if (changedId) {
                message.changedId = changedId;
            }
            chrome.tabs.sendMessage(tabs[0].id, message, (response) => {});
        }
    });
}