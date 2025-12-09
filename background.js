chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    // handle opening a new background tab
    if (request.action === "openBackgroundTab" && request.url) {
        chrome.tabs.create({ url: request.url, active: false }, (newTab) => {
            console.log(`Opened new background tab with ID: ${newTab.id}`);
        });
        return true;
    }
});
