document.addEventListener("DOMContentLoaded", () => {
    // player: initialize settings
    initPopupSettings(PLAYER_DEFAULT_SETTINGS);

    // player: setup reset buttons
    setupResetButton(
        "player-controlsBgCustom-reset",
        [
            "player-controlsBgCustom",
            "player-controlsBgCustom-color",
            "player-controlsBgCustom-colorAlpha",
            "player-controlsBgCustom-height",
            "player-controlsBgCustom-heightUnit",
        ],
        PLAYER_DEFAULT_SETTINGS
    );

    setupResetButton(
        "player-persistentProgressBar-reset",
        ["player-persistentProgressBar", "player-persistentProgressBar-color", "player-persistentProgressBar-height", "player-persistentProgressBar-delay"],
        PLAYER_DEFAULT_SETTINGS
    );

    // player: setup toggle interactions
    setupToggleInteraction("player-controlsBgCustom", [
        "player-controlsBgCustom-color",
        "player-controlsBgCustom-colorAlpha",
        "player-controlsBgCustom-height",
        "player-controlsBgCustom-heightUnit",
    ]);

    setupToggleInteraction("player-persistentProgressBar", [
        "player-persistentProgressBar-color",
        "player-persistentProgressBar-height",
        "player-persistentProgressBar-delay",
    ]);
});
