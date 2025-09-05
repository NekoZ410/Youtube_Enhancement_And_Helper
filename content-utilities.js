// shortsToVideo: convert URL shorts to video
function convertShortsToVideo(isEnabled) {
    if (isEnabled) {
        const currentURL = window.location.href;

        if (currentURL.includes("/shorts/")) {
            const videoId = currentURL.split("/shorts/")[1].split("?")[0];
            const newURL = `https://www.youtube.com/watch?v=${videoId}`;
            window.location.replace(newURL);
        }
    }
}

// init and caching settings on load
chrome.storage.local.get("utilities-shortsToVideo", (result) => {
    convertShortsToVideo(result["utilities-shortsToVideo"]);
});