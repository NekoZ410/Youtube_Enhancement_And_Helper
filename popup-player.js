document.addEventListener("DOMContentLoaded", () => {
    // player: initialize settings
    initPopupSettings(PLAYER_DEFAULT_SETTINGS);

    // player: reset buttons
    document.getElementById("player-controlsBgHeight-reset").addEventListener("click", () => {
        const defaults = {
            "player-controlsBgHeight-toggle": PLAYER_DEFAULT_SETTINGS["player-controlsBgHeight-toggle"],
            "player-controlsBgHeight": PLAYER_DEFAULT_SETTINGS["player-controlsBgHeight"],
            "player-controlsBgHeight-unit": PLAYER_DEFAULT_SETTINGS["player-controlsBgHeight-unit"],
        };

        chrome.storage.local.set(defaults, () => {
            document.getElementById("player-controlsBgHeight-toggle").checked = defaults["player-controlsBgHeight-toggle"];
            document.getElementById("player-controlsBgHeight").value = defaults["player-controlsBgHeight"];
            document.getElementById("player-controlsBgHeight-unit").value = defaults["player-controlsBgHeight-unit"];
            sendUpdateStylesMessage();
        });
    });

    document.getElementById("player-controlsBgClr-reset").addEventListener("click", () => {
        const defaults = {
            "player-controlsBgClr-toggle": PLAYER_DEFAULT_SETTINGS["player-controlsBgClr-toggle"],
            "player-controlsBgClr": PLAYER_DEFAULT_SETTINGS["player-controlsBgClr"],
            "player-controlsBgClrAlpha": PLAYER_DEFAULT_SETTINGS["player-controlsBgClrAlpha"],
        };

        chrome.storage.local.set(defaults, () => {
            document.getElementById("player-controlsBgClr-toggle").checked = defaults["player-controlsBgClr-toggle"];
            document.getElementById("player-controlsBgClr").value = defaults["player-controlsBgClr"];
            document.getElementById("player-controlsBgClrAlpha").value = defaults["player-controlsBgClrAlpha"];
            sendUpdateStylesMessage();
        });
    });
});
