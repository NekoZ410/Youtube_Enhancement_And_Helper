document.addEventListener("DOMContentLoaded", () => {
    // ui: initialize settings
    initPopupSettings(UI_DEFAULT_SETTINGS);

    // ui: setup reset buttons
    setupResetButton("ui-videosPerRow-home-reset", ["ui-videosPerRow-home", "ui-videosPerRow-home-count"], UI_DEFAULT_SETTINGS);
    setupResetButton("ui-shortsPerRow-home-reset", ["ui-shortsPerRow-home", "ui-shortsPerRow-home-count"], UI_DEFAULT_SETTINGS);
    setupResetButton("ui-postsPerRow-home-reset", ["ui-postsPerRow-home", "ui-postsPerRow-home-count"], UI_DEFAULT_SETTINGS);
    setupResetButton("ui-othersPerRow-home-reset", ["ui-othersPerRow-home", "ui-othersPerRow-home-count"], UI_DEFAULT_SETTINGS);
    setupResetButton("ui-relatedVideosPerRow-player-reset", ["ui-relatedVideosPerRow-player", "ui-relatedVideosPerRow-player-count"], UI_DEFAULT_SETTINGS);
    setupResetButton("ui-menuBtnPosFix-all-reset", ["ui-menuBtnPosFix-all"], UI_DEFAULT_SETTINGS);

    // ui: setup toggle interactions
    setupToggleInteraction("ui-videosPerRow-home", ["ui-videosPerRow-home-count"]);
    setupToggleInteraction("ui-shortsPerRow-home", ["ui-shortsPerRow-home-count"]);
    setupToggleInteraction("ui-postsPerRow-home", ["ui-postsPerRow-home-count"]);
    setupToggleInteraction("ui-othersPerRow-home", ["ui-othersPerRow-home-count"]);
    setupToggleInteraction("ui-relatedVideosPerRow-player", ["ui-relatedVideosPerRow-player-count"]);
});
