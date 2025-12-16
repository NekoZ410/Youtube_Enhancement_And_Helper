document.addEventListener("DOMContentLoaded", () => {
    // ui: initialize settings
    initPopupSettings(UI_DEFAULT_SETTINGS);

    // ui: setup reset buttons
    setupResetButton("ui-videosPerRow-home-reset", ["ui-videosPerRow-home", "ui-videosPerRow-home-count"], UI_DEFAULT_SETTINGS);
    setupResetButton("ui-shortsPerRow-home-reset", ["ui-shortsPerRow-home", "ui-shortsPerRow-home-count"], UI_DEFAULT_SETTINGS);
    setupResetButton("ui-postsPerRow-home-reset", ["ui-postsPerRow-home", "ui-postsPerRow-home-count"], UI_DEFAULT_SETTINGS);
    setupResetButton("ui-newsPerRow-home-reset", ["ui-newsPerRow-home", "ui-newsPerRow-home-count"], UI_DEFAULT_SETTINGS);

    // ui: setup toggle interactions
    setupToggleInteraction("ui-videosPerRow-home", ["ui-videosPerRow-home-count"]);
    setupToggleInteraction("ui-shortsPerRow-home", ["ui-shortsPerRow-home-count"]);
    setupToggleInteraction("ui-postsPerRow-home", ["ui-postsPerRow-home-count"]);
    setupToggleInteraction("ui-newsPerRow-home", ["ui-newsPerRow-home-count"]);
});
