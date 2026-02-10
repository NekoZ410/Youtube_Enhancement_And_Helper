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
                let cleanHex = hex.replace(/^#/, "");

                if (cleanHex.length === 3) {
                    cleanHex = cleanHex
                        .split("")
                        .map((char) => char + char)
                        .join("");
                }

                const num = parseInt(cleanHex, 16);
                const r = (num >> 16) & 255;
                const g = (num >> 8) & 255;
                const b = num & 255;

                return `${r}, ${g}, ${b}`;
            };
            const rgbColor = hexToRgb(color);

            return `
                ${MAIN_PLRCTN_PLAYER} .ytp-gradient-top, ${MAIN_BIGMODE} .ytp-gradient-top {
                    background-image: none !important;
                }
                ${MAIN_PLRCTN_PLAYER} .ytp-gradient-bottom, ${MAIN_BIGMODE} .ytp-gradient-bottom {
                    background-image: none !important;
                    background-color: rgba(${rgbColor}, ${colorAlpha}) !important;
                    height: ${height}${heightUnit} !important;
                }
                ${MAIN_BIGMODE} .ytp-gradient-bottom {
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
            ${MAIN_PLRCTN_PLAYER}.ytp-autohide .player-persistentProgressBar,
            ${MAIN_BIGMODE_PLRCTN_PLAYER}.ytp-autohide .player-persistentProgressBar {
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

let ppbRafId = null;
let waitPlayerRafId = null;

// player: clear all tasks
function clearAllPlayerTasks() {
    if (ppbRafId) {
        cancelAnimationFrame(ppbRafId);
        ppbRafId = null;
    }
    if (waitPlayerRafId) {
        cancelAnimationFrame(waitPlayerRafId);
        waitPlayerRafId = null;
    }
}

// player: wait for player
function waitForPlayer(callback) {
    if (waitPlayerRafId) cancelAnimationFrame(waitPlayerRafId);

    const checkExist = () => {
        const player = document.querySelector(MAIN_PLRCTN_PLAYER) || document.querySelector(MAIN_BIGMODE_PLRCTN_PLAYER);
        if (player) {
            waitPlayerRafId = null;
            callback(player); // if found, run callback
        } else {
            waitPlayerRafId = requestAnimationFrame(checkExist); // if not found, check again
        }
    };
    waitPlayerRafId = requestAnimationFrame(checkExist); // start checking
}

// player - persistentProgressBar: main process
function processPersistentProgressBar(settings) {
    const isEnabled = settings["player-persistentProgressBar"];

    clearAllPlayerTasks(); // cleanup first

    waitForPlayer((playerContainer) => {
        // find bar container
        let barContainer = playerContainer.querySelector(".player-persistentProgressBar");
        if (!isEnabled) {
            if (barContainer) barContainer.remove();
            return;
        }
        if (!barContainer) {
            barContainer = document.createElement("div");
            barContainer.className = "player-persistentProgressBar";
            const barFill = document.createElement("div");
            barFill.className = "player-persistentProgressBar-fill"; // create bar fill element
            barContainer.appendChild(barFill);
            playerContainer.appendChild(barContainer);
        }

        // update bar fill
        const video = playerContainer.querySelector("video");
        const fill = barContainer.querySelector(".player-persistentProgressBar-fill");
        const delay = settings["player-persistentProgressBar-delay"] || 1000;
        let lastUpdateTime = 0;

        const updateLoop = (timestamp) => {
            if (!video || !fill) return;
            if (timestamp - lastUpdateTime >= delay) {
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
                lastUpdateTime = timestamp;
            }

            ppbRafId = requestAnimationFrame(updateLoop);
        };

        // start fresh loop
        ppbRafId = requestAnimationFrame(updateLoop);
    });
}

// player - pipPlayer: main process
function processPipPlayer(settings) {
    const isEnabled = settings["player-pipPlayer"];

    waitForPlayer((playerContainer) => {
        // find right controls right side container
        const controlsRightRight = playerContainer.querySelector(".ytp-right-controls-right");
        if (!controlsRightRight) return;

        let pipBtn = controlsRightRight.querySelector(".yeah-player-pipPlayer-btn");
        if (!pipBtn) {
            const pipBtnHtml = `
                <button class="yeah-player-pipPlayer-btn ytp-button" title="Pop-out player" aria-haspopup="true" data-priority="1400"
                    data-tooltip-title="Pop-out player" data-title-no-tooltip="Pop-out player">
                    <svg height="100%" viewBox="0 0 36 36" width="100%" style="padding: 0">
                        <path fill="#fff" d="M29 25V11c0-1.1-.9-2-2-2H9c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2m-2 0H9V11h18zm-2-7c0-.6-.4-1-1-1h-6c-.6 0-1 .4-1 1v4c0 .6.4 1 1 1h6c.6 0 1-.4 1-1zm-2 1v2h-4v-2z"/>
                    </svg>
                </button>`;

            const tempDiv = document.createElement("div");
            tempDiv.innerHTML = pipBtnHtml.trim();
            pipBtn = tempDiv.firstChild;
            controlsRightRight.insertBefore(pipBtn, controlsRightRight.firstChild);

            // add click event
            pipBtn.addEventListener("click", () => {
                const video = playerContainer.querySelector("video");
                if (!video) return;

                if (document.pictureInPictureElement) {
                    document.exitPictureInPicture();
                } else {
                    video.requestPictureInPicture().catch((err) => console.warn("[YEAH] PiP failed:", err));
                }
            });
        }

        if (!isEnabled) {
            if (pipBtn) pipBtn.style.display = "none";
            return;
        }
        pipBtn.style.display = "unset";

        // update tooltip text
        const video = playerContainer.querySelector("video");
        const updatePipTooltip = () => {
            const isPip = !!document.pictureInPictureElement;
            const label = isPip ? "Pop-in player" : "Pop-out player";
            pipBtn.setAttribute("title", label);
            pipBtn.setAttribute("data-tooltip-title", label);
            pipBtn.setAttribute("data-title-no-tooltip", label);
        };

        if (video) {
            video.removeEventListener("enterpictureinpicture", updatePipTooltip);
            video.removeEventListener("leavepictureinpicture", updatePipTooltip);
            video.addEventListener("enterpictureinpicture", updatePipTooltip);
            video.addEventListener("leavepictureinpicture", updatePipTooltip);
            updatePipTooltip();
        }
    });
}

// player: observer to handle dynamic content
function setupPlayerObserver(settings) {
    if (!document.body) {
        window.requestAnimationFrame(() => setupPlayerObserver(settings));
        return;
    }

    processPersistentProgressBar(settings);
    processPipPlayer(settings);

    const observer = new MutationObserver((mutations) => {
        const hasNewVideo = mutations.some((m) =>
            Array.from(m.addedNodes).some((node) => node.nodeType === 1 && (node.id === "movie_player" || node.querySelector?.("#movie_player"))),
        );

        if (hasNewVideo) {
            processPersistentProgressBar(settings);
            processPipPlayer(settings);
        }
    });

    const targetNode = document.querySelector("ytd-page-manager") || document.body; // narrow target first
    observer.observe(targetNode, { childList: true, subtree: true });
}

// player: init settings on load
initModuleSettings(PLAYER_DEFAULT_SETTINGS, (settings) => {
    applyModuleStyles(settings, playerStyleSettings);
    setupPlayerObserver(settings);
});

// player: listen for storage changes
setupModuleStorageListener(PLAYER_DEFAULT_SETTINGS, (settings) => {
    applyModuleStyles(settings, playerStyleSettings);
    clearAllPlayerTasks();
    processPersistentProgressBar(settings);
    processPipPlayer(settings);
});
