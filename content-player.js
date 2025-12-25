// player: style settings
const playerStyleSettings = {
    "player-controlsBgCustom": {
        styleIdDynamic: "player-controlsBgCustom-inject-dynamic",
        cssDynamicGen: (isEnabled, settings) => {
            if (!isEnabled) return "";

            const color = settings["player-controlsBgCustom-color"];
            const colorAlpha = settings["player-controlsBgCustom-colorAlpha"];
            const height = settings["player-controlsBgCustom-height"];
            const heightUnit = settings["player-controlsBgCustom-heightUnit"];

            // hex to rgb helper
            const hexToRgb = (hex) => {
                const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
                return result ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}` : null;
            };
            const rgbColor = hexToRgb(color);

            return `
                ${WATCH_MAIN_PLRCTN_PLAYER} .ytp-gradient-top, ${WATCH_MAIN_BIGMODE} .ytp-gradient-top {
                    background-image: none !important;
                }
                ${WATCH_MAIN_PLRCTN_PLAYER} .ytp-gradient-bottom, ${WATCH_MAIN_BIGMODE} .ytp-gradient-bottom {
                    background-image: none !important;
                    background-color: rgba(${rgbColor}, ${colorAlpha}) !important;
                    height: ${height}${heightUnit} !important;
                }
                ${WATCH_MAIN_BIGMODE} .ytp-gradient-bottom {
                    padding-top: 45px !important;
                }`;
        },
    },
    "player-persistentProgressBar": {
        styleIdStatic: "player-persistentProgressBar-inject-static",
        cssStatic: `
            .player-persistentProgressBar {
                bottom: 0;
                left: 0;
                z-index: 100;
                pointer-events: none;
                opacity: 0;
                transition: opacity 0.2s;
                position: absolute;
                width: 100%;
            }
            ${WATCH_MAIN_PLRCTN_PLAYER}.ytp-autohide .player-persistentProgressBar,
            ${WATCH_MAIN_BIGMODE_PLRCONT_PLAYER}.ytp-autohide .player-persistentProgressBar {
                opacity: 1 !important;
            }
            .player-persistentProgressBar-fill {
                transition: width 0.2s linear;
                width: 0%;
                height: 100%;
            }`,
        styleIdDynamic: "player-persistentProgressBar-inject-dynamic",
        cssDynamicGen: (isEnabled, settings) => {
            if (!isEnabled) return ".player-persistentProgressBar { display: none !important; }";

            const height = settings["player-persistentProgressBar-height"];
            const color = settings["player-persistentProgressBar-color"];

            return `
                .player-persistentProgressBar {
                    display: block !important;
                    height: ${height}px !important;
                }
                .player-persistentProgressBar-fill {
                    background-color: ${color} !important;
                }`;
        },
    },
};

// player: wait for player
function waitForPlayer(callback) {
    const checkExist = setInterval(() => {
        const player = document.querySelector(WATCH_MAIN_PLRCTN_PLAYER) || document.querySelector(WATCH_MAIN_BIGMODE_PLRCONT_PLAYER);
        if (player) {
            clearInterval(checkExist);
            callback(player);
        }
    }, 500);
}

// player - persistentProgressBar: main process
let ppbInterval = null;
function processPersistentProgressBar(settings) {
    const isEnabled = settings["player-persistentProgressBar"];

    waitForPlayer((playerContainer) => {
        // find bar container
        let barContainer = playerContainer.querySelector(".player-persistentProgressBar");
        if (!isEnabled) {
            if (barContainer) barContainer.remove();
            if (ppbInterval) {
                clearInterval(ppbInterval);
                ppbInterval = null;
            }
            return;
        }
        if (!barContainer) {
            barContainer = document.createElement("div");
            barContainer.className = "player-persistentProgressBar";

            const barFill = document.createElement("div");
            barFill.className = "player-persistentProgressBar-fill";

            barContainer.appendChild(barFill);
            playerContainer.appendChild(barContainer);
        }

        // clear interval
        if (!ppbInterval) {
            const delay = settings["player-persistentProgressBar-delay"] || 1000;

            const updateBar = () => {
                const video = playerContainer.querySelector("video");
                const fill = barContainer.querySelector(".player-persistentProgressBar-fill");
                if (!video || !fill) return;
                const currentTime = video.currentTime;
                const duration = video.duration;
                const isLiveStream = duration === Infinity || playerContainer.classList.contains("ytp-live");

                if (isLiveStream) {
                    fill.style.width = "100%";
                } else if (duration > 0) {
                    const percentage = (currentTime / duration) * 100;
                    fill.style.width = `${percentage}%`;
                } else {
                    fill.style.width = "0%";
                }
            };

            // run update bar continuously
            updateBar();
            ppbInterval = setInterval(updateBar, delay);
        }
    });
}

// player: observer to handle dynamic content
function setupPlayerObserver(settings) {
    if (!document.body) {
        window.requestAnimationFrame(() => setupPlayerObserver(settings));
        return;
    }

    processPersistentProgressBar(settings); // run once to init

    const observer = new MutationObserver((mutations) => {
        let shouldProcess = false;
        for (const mutation of mutations) {
            if (mutation.type === "childList" && mutation.addedNodes.length > 0) {
                for (const node of mutation.addedNodes) {
                    if (node.nodeType === 1) {
                        // if node is player container
                        if (node.querySelector && (node.querySelector(WATCH_MAIN_PLRCTN_PLAYER) || node.querySelector(WATCH_MAIN_BIGMODE_PLRCONT_PLAYER))) {
                            shouldProcess = true;
                            break;
                        }
                        
                        // if node is player
                        if (node.id === "movie_player") {
                            shouldProcess = true;
                            break;
                        }
                    }
                }
            }
        }
        if (shouldProcess) {
            if (ppbInterval) {
                clearInterval(ppbInterval);
                ppbInterval = null;
            }
            processPersistentProgressBar(settings);
        }
    });

    observer.observe(document.body, { childList: true, subtree: true });
}

// player: init settings on load
initModuleSettings(PLAYER_DEFAULT_SETTINGS, (settings) => {
    applyModuleStyles(settings, playerStyleSettings);
    setupPlayerObserver(settings);
});

// player: listen for storage changes
setupModuleStorageListener(PLAYER_DEFAULT_SETTINGS, (settings) => {
    applyModuleStyles(settings, playerStyleSettings);
    if (ppbInterval) {
        clearInterval(ppbInterval);
        ppbInterval = null;
    }
    processPersistentProgressBar(settings);
});
