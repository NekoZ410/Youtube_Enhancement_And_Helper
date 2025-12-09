// global: display info from manifest
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

// global: send message to update styles
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
