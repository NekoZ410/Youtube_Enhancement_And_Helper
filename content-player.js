// player: style settings
const playerStyleSettings = {
    "player-controlsBgHeight": {
        toggleKey: "player-controlsBgHeight-toggle",
        styleIdDynamic: "player-controlsBgHeight-inject-dynamic",
        cssDynamicGen: (isEnabled, settings) => {
            if (!isEnabled) return "";

            const height = settings["player-controlsBgHeight"];
            const unit = settings["player-controlsBgHeight-unit"];
            return `.ytp-gradient-bottom {
                        height: ${height}${unit} !important;
                    }
                    .ytp-big-mode .ytp-gradient-bottom {
                        padding-top: 45px !important;
                    }`;
        },
    },
    "player-controlsBgClr": {
        toggleKey: "player-controlsBgClr-toggle",
        styleIdDynamic: "player-controlsBgClr-inject-dynamic",
        cssDynamicGen: (isEnabled, settings) => {
            if (!isEnabled) return "";

            const color = settings["player-controlsBgClr"];
            const alpha = settings["player-controlsBgClrAlpha"];

            // hex to rgb value helper
            const hexToRgb = (hex) => {
                const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
                return result ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}` : null;
            };
            const rgbColor = hexToRgb(color);

            return `.ytp-gradient-top {
                        background-image: none !important;
                    }
                    .ytp-gradient-bottom {
                        background-image: none !important;
                        background-color: rgba(${rgbColor}, ${alpha}) !important;
                    }`;
        },
    },
};

// player: init settings on load
initModuleSettings(PLAYER_DEFAULT_SETTINGS, (settings) => {
    applyModuleStyles(settings, playerStyleSettings);
});

// player: listen for storage changes
setupModuleStorageListener(PLAYER_DEFAULT_SETTINGS, (settings) => {
    applyModuleStyles(settings, playerStyleSettings);
});
