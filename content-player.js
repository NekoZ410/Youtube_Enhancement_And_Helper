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
    "player-pipPlayer": {
        styleIdStatic: "player-pipPlayer-inject-static",
        cssStatic: `
            .yeah-pip-body {
                margin: 0;
                padding: 0;
                overflow: hidden !important;
                background: #000;
                flex-direction: column;
                font-family: "YouTube Noto", Roboto, Arial, Helvetica, sans-serif;
                user-select: none;
                display: flex;
                width: 100vw;
                min-width: 300px;
                height: 100vh;
            }

            .yeah-pip-video-container {
                flex-grow: 1;
                width: 100%;
                height: 100%;
                display: flex;
                position: relative;
                background: #000;
            }
            .yeah-pip-video-container video {
                width: 100% !important;
                height: 100% !important;
                object-fit: contain !important; 
                margin: 0 !important;
                position: static !important;
            }

            .yeah-pip-btn {
                background-color: rgba(255,255,255, 0.9);
                border: none;
                color: #000;
                cursor: pointer;
                padding: 0;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 14px; 
                width: 32px;
                height: 32px;
                border-radius: 5px; 
                transition: transform 0.1s, background-color 0.1s;
                box-shadow: 0 2px 4px rgba(0,0,0,0.3);
            }
            .yeah-pip-btn:hover {
                transform: scale(1.05);
                background-color: #fff;
            }
            .yeah-pip-btn:active { transform: scale(0.95); }

            /* header: volume slider + fit ratio button --- */
            .yeah-pip-top-controls {
                position: absolute;
                padding: 3vw 3vw 0;
                width: 94vw;
                z-index: 30;
                justify-content: space-between;
                opacity: 0;
                transition: opacity 0.2s;
                pointer-events: none; 
                display: flex;       
                align-items: center; 
                gap: 10px;           
            }
            .yeah-pip-body:hover .yeah-pip-top-controls {
                opacity: 1;
            }
            .yeah-pip-top-controls > * {
                pointer-events: auto; 
            }

            .yeah-pip-vol-wrapper {
                display: flex;
                align-items: center;
                background-color: rgba(255,255,255, 0.9);
                border-radius: 5px;
                padding: 0 8px 0 2px;
                height: 32px;
                gap: 5px;
                box-shadow: 0 2px 4px rgba(0,0,0,0.3);
                color: #000;
            }
            .yeah-pip-vol-wrapper .yeah-pip-btn {
                background: transparent; 
                box-shadow: none;
                width: 28px;
            }
            .yeah-pip-volume-slider {
                width: 55px;
                height: 3px;
                cursor: pointer;
                accent-color: #000; 
            }
            .yeah-pip-volume-text {
                font-size: 11px;
                font-weight: bold;
                min-width: 22px;
                text-align: right;
            }

            .yeah-pip-fit-btn {
                opacity: 0.9;
            }

            /* bottom: controls */
            .yeah-pip-bottom-controls {
                position: absolute;
                bottom: 0;
                left: 0;
                right: 0;
                background: linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.4) 60%, transparent 100%);
                display: flex;
                flex-direction: column;
                opacity: 0;
                transition: opacity 0.2s;
                padding-bottom: 15px;
                z-index: 20;
            }
            .yeah-pip-body:hover .yeah-pip-bottom-controls {
                opacity: 1;
            }

            .yeah-pip-progress-slider {
                -webkit-appearance: none;
                width: calc(100% - 24px);
                margin: 0 12px 10px 12px;
                height: 4px;
                background: rgba(255,255,255,0.3);
                border-radius: 2px;
                cursor: pointer;
                outline: none;
                position: relative;
                z-index: 25;
                transition: height 0.1s;
            }
            .yeah-pip-progress-slider:hover { height: 6px; }
            .yeah-pip-progress-slider::-webkit-slider-thumb {
                -webkit-appearance: none;
                width: 12px;
                height: 12px;
                background: #fff; 
                border-radius: 50%;
                cursor: pointer;
                transition: transform 0.1s;
                transform: scale(0);
            }
            .yeah-pip-progress-slider:hover::-webkit-slider-thumb { transform: scale(1); }

            .yeah-pip-persistent-progress-bar {
                position: absolute; bottom: 0; left: 0; width: 100%; height: 3px;
                background: rgba(255,255,255,0.1); z-index: 10; pointer-events: none;
                opacity: 1; transition: opacity 0.2s;
            }
            .yeah-pip-persistent-progress-bar-fill { height: 100%; width: 0%; }
            .yeah-pip-body:hover .yeah-pip-persistent-progress-bar { opacity: 0; }

            .yeah-pip-bottom-controls-wrapper {
                display: flex;
                align-items: center;
                justify-content: space-between;
                padding: 0 15px;
                gap: 10px;
            }            
            .yeah-pip-bottom-controls-left { display: flex; align-items: center; gap: 10px; }
            .yeah-pip-bottom-controls-right { display: flex; align-items: center; gap: 8px; }

            .yeah-pip-time {
                background-color: rgba(255,255,255, 0.9);
                color: #000;
                font-size: 12px;
                font-weight: bold;
                padding: 0 10px;
                height: 32px;
                display: flex;
                align-items: center;
                justify-content: center;
                border-radius: 5px;
                box-shadow: 0 2px 4px rgba(0,0,0,0.3);
                white-space: nowrap;
                margin-left: 5px;
            }`,
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

            // click event and handle pip window creation
            pipBtn.addEventListener("click", async () => {
                if (window.documentPictureInPicture && window.documentPictureInPicture.window) {
                    window.documentPictureInPicture.window.close();
                    return;
                }

                const video = playerContainer.querySelector("video");
                if (!video) return;

                try {
                    // calculate PiP window ratio and create
                    const playerRect = playerContainer.getBoundingClientRect();
                    const pipScalingFactor = 0.3;
                    let initialWidth = Math.floor(playerRect.width * pipScalingFactor);
                    if (initialWidth < 350) initialWidth = 350; // minimum width to avoid controls hidden
                    let initialHeight = Math.round(initialWidth * (video.videoHeight / video.videoWidth));
                    const pipWindow = await window.documentPictureInPicture.requestWindow({
                        width: initialWidth,
                        height: initialHeight,
                    });

                    // inherit and apply styles to PiP window
                    const styleTags = document.querySelectorAll("style");
                    styleTags.forEach((style) => pipWindow.document.head.appendChild(style.cloneNode(true))); // inherit styles
                    const linkTags = document.querySelectorAll("link[rel='stylesheet']");
                    linkTags.forEach((link) => pipWindow.document.head.appendChild(link.cloneNode(true))); // inherit external styles

                    const fontAwesomeLink = document.createElement("link");
                    fontAwesomeLink.rel = "stylesheet";
                    fontAwesomeLink.href = "https://ka-f.fontawesome.com/releases/v7.2.0/css/free.min.css?token=247de30b37";
                    fontAwesomeLink.crossOrigin = "anonymous";
                    pipWindow.document.head.appendChild(fontAwesomeLink);

                    const pbColor = settings["player-persistentProgressBar-color"] || "#b2071d"; // inherit from persistentProgressBar, fallback to #b2071d

                    // initialize PiP window body
                    pipWindow.document.body.className = "yeah-pip-body";
                    pipWindow.document.body.style.minWidth = "300px";
                    pipWindow.document.body.innerHTML = `
                        <div class="yeah-pip-video-container"></div>                        
                        <div class="yeah-pip-top-controls">
                            <div class="yeah-pip-vol-wrapper">
                                <button class="yeah-pip-btn vol-icon-btn" title="Mute/Unmute"><i class="fa-solid fa-volume-high"></i></button>
                                <input type="range" class="yeah-pip-volume-slider" min="0" max="100" step="1" title="Volume">
                                <span class="yeah-pip-volume-text">100</span>
                            </div>
                            <button class="yeah-pip-btn yeah-pip-fit-btn" title="Fit Window Ratio"><i class="fa-solid fa-crop-simple"></i></button>
                        </div>
                        <div class="yeah-pip-persistent-progress-bar">
                            <div class="yeah-pip-persistent-progress-bar-fill" style="background-color: ${pbColor} !important;"></div>
                        </div>
                        <div class="yeah-pip-bottom-controls">
                            <input type="range" class="yeah-pip-progress-slider" min="0" max="100" step="0.01" value="0">
                            <div class="yeah-pip-bottom-controls-wrapper">
                                <div class="yeah-pip-bottom-controls-left">
                                    <button class="yeah-pip-btn play-pause-btn" title="Play/Pause"><i class="fa-solid fa-play"></i></button>
                                    <span class="yeah-pip-time">--:--:-- / --:--:--</span>
                                </div>
                                <div class="yeah-pip-bottom-controls-right">
                                    <button class="yeah-pip-btn seek-back-btn" title="Back 5s"><i class="fa-solid fa-rotate-left"></i></button>
                                    <button class="yeah-pip-btn seek-fwd-btn" title="Forward 5s"><i class="fa-solid fa-rotate-right"></i></button>
                                    <button class="yeah-pip-btn prev-video-btn" title="Previous Video"><i class="fa-solid fa-backward-step"></i></button>
                                    <button class="yeah-pip-btn next-video-btn" title="Next Video"><i class="fa-solid fa-forward-step"></i></button>
                                </div>
                            </div>
                        </div>
                        <style>
                            .yeah-pip-video-container video {
                                width: 100% !important; height: 100% !important;
                                object-fit: contain !important; margin: 0 !important;
                                top: 0 !important; left: 0 !important;
                                transform: none !important; position: static !important;
                            }
                            .yeah-pip-video-container .ytp-chrome-bottom { display: none !important; }
                            .yeah-pip-progress-slider::-webkit-slider-thumb { background: ${pbColor} !important; }
                        </style>
                    `;
                    const videoContainer = pipWindow.document.querySelector(".yeah-pip-video-container");
                    const originalParent = video.parentElement;
                    videoContainer.appendChild(video);

                    // elements
                    const playBtn = pipWindow.document.querySelector(".play-pause-btn");
                    const playIcon = playBtn.querySelector("i");
                    const volSlider = pipWindow.document.querySelector(".yeah-pip-volume-slider");
                    const volIconBtn = pipWindow.document.querySelector(".vol-icon-btn");
                    const volIcon = volIconBtn.querySelector("i");
                    const volText = pipWindow.document.querySelector(".yeah-pip-volume-text");
                    const timeDisp = pipWindow.document.querySelector(".yeah-pip-time");
                    const progSlider = pipWindow.document.querySelector(".yeah-pip-progress-slider");
                    const persistFill = pipWindow.document.querySelector(".yeah-pip-persistent-progress-bar-fill");
                    const seekBackBtn = pipWindow.document.querySelector(".seek-back-btn");
                    const seekFwdBtn = pipWindow.document.querySelector(".seek-fwd-btn");
                    const prevBtn = pipWindow.document.querySelector(".prev-video-btn");
                    const nextBtn = pipWindow.document.querySelector(".next-video-btn");
                    const fitBtn = pipWindow.document.querySelector(".yeah-pip-fit-btn");

                    // play/pause toggle
                    const togglePlay = () => (video.paused ? video.play() : video.pause());
                    playBtn.onclick = togglePlay;
                    videoContainer.onclick = (e) => {
                        if (e.target === videoContainer || e.target === video) togglePlay();
                    };

                    // volume manipulation
                    const updateVolumeIcon = (volValue) => {
                        volIcon.className = "fa-solid";
                        if (volValue === 0) volIcon.classList.add("fa-volume-xmark");
                        else if (volValue < 25) volIcon.classList.add("fa-volume-off");
                        else if (volValue < 50) volIcon.classList.add("fa-volume-low");
                        else if (volValue < 75) volIcon.classList.add("fa-volume");
                        else volIcon.classList.add("fa-volume-high");
                    };

                    const initialVol = Math.round(video.volume * 100); // inherit volume from original player
                    volSlider.value = initialVol;
                    volText.textContent = initialVol;
                    updateVolumeIcon(initialVol);

                    const handleVolChange = (e) => {
                        const val = parseInt(e.target.value);
                        video.volume = val / 100;
                        volText.textContent = val;
                        updateVolumeIcon(val);
                    };
                    volSlider.oninput = handleVolChange;

                    let preMuteVol = 100;
                    volIconBtn.onclick = () => {
                        if (video.volume > 0) {
                            // click to mute
                            preMuteVol = video.volume * 100;
                            video.volume = 0;
                            volSlider.value = 0;
                            volText.textContent = 0;
                            updateVolumeIcon(0);
                        } else {
                            // click again to unmute
                            const restore = preMuteVol || 50;
                            video.volume = restore / 100;
                            volSlider.value = restore;
                            volText.textContent = restore;
                            updateVolumeIcon(restore);
                        }
                    };

                    // progress manipulation
                    const formatTime = (seconds, forceHour = false) => {
                        if (isNaN(seconds)) return "00:00";
                        const h = Math.floor(seconds / 3600);
                        const m = Math.floor((seconds % 3600) / 60);
                        const s = Math.floor(seconds % 60);
                        const mStr = m.toString().padStart(2, "0");
                        const sStr = s.toString().padStart(2, "0");
                        if (h > 0 || forceHour) return `${h}:${mStr}:${sStr}`;
                        return `${mStr}:${sStr}`;
                    };

                    let isDraggingSlider = false;
                    progSlider.oninput = (e) => {
                        isDraggingSlider = true;
                        const val = parseFloat(e.target.value);

                        if (isFinite(video.duration)) {
                            const seekTime = (val / 100) * video.duration;
                            const useHour = video.duration >= 3600;
                            timeDisp.textContent = `${formatTime(seekTime, useHour)} / ${formatTime(video.duration, useHour)}`; // live preview seek time
                        }

                        const color = pbColor;
                        progSlider.style.background = `linear-gradient(to right, ${color} ${val}%, rgba(255,255,255,0.3) ${val}%)`;
                    };
                    progSlider.onchange = (e) => {
                        const val = parseFloat(e.target.value);
                        if (isFinite(video.duration)) {
                            video.currentTime = (val / 100) * video.duration;
                        }
                        isDraggingSlider = false;
                    };

                    seekBackBtn.onclick = () => {
                        video.currentTime = Math.max(0, video.currentTime - 5);
                    };
                    seekFwdBtn.onclick = () => {
                        if (isFinite(video.duration)) {
                            video.currentTime = Math.min(video.duration, video.currentTime + 5);
                        }
                    };
                    prevBtn.onclick = () => {
                        document.querySelector(".ytp-prev-button")?.click();
                    };
                    nextBtn.onclick = () => {
                        document.querySelector(".ytp-next-button")?.click();
                    };

                    // fit ratio button
                    const handleFitWindow = () => {
                        const videoRatio = video.videoWidth / video.videoHeight;
                        const windowRatio = pipWindow.innerWidth / pipWindow.innerHeight;
                        if (!videoRatio) return;

                        const chromeWidth = pipWindow.outerWidth - pipWindow.innerWidth;
                        const chromeHeight = pipWindow.outerHeight - pipWindow.innerHeight;

                        let targetW, targetH;
                        if (windowRatio > videoRatio) {
                            // if windowRatio > videoRatio, rescale based on width
                            targetH = pipWindow.innerHeight;
                            targetW = Math.round(targetH * videoRatio);
                        } else {
                            // if windowRatio < videoRatio, rescale based on height
                            targetW = pipWindow.innerWidth;
                            targetH = Math.round(targetW / videoRatio);
                        }

                        if (targetW < 350) {
                            targetW = 350;
                            targetH = Math.round(targetW / videoRatio); // minimum width to avoid controls hidden
                        }

                        pipWindow.resizeTo(targetW + chromeWidth, targetH + chromeHeight);
                    };
                    fitBtn.onclick = handleFitWindow;

                    // update UI loop
                    const updateUI = () => {
                        if (!pipWindow || pipWindow.closed) return;

                        // play/pause
                        playIcon.className = `fa-solid ${video.paused ? "fa-play" : "fa-pause"}`;

                        // progress and time
                        if (video.duration > 0) {
                            const percent = (video.currentTime / video.duration) * 100;

                            if (!isDraggingSlider) {
                                progSlider.value = percent;
                                progSlider.style.background = `linear-gradient(to right, ${pbColor} ${percent}%, rgba(255,255,255,0.3) ${percent}%)`;

                                const useHour = video.duration >= 3600;
                                timeDisp.textContent = `${formatTime(video.currentTime, useHour)} / ${formatTime(video.duration, useHour)}`;
                            }
                            persistFill.style.width = `${percent}%`; // update persistent progress bar
                        }

                        // volume
                        const currentVol = Math.round(video.volume * 100);
                        if (document.activeElement !== volSlider) {
                            volSlider.value = currentVol;
                            volText.textContent = currentVol;
                            updateVolumeIcon(currentVol);
                        }
                    };
                    const updateInterval = setInterval(updateUI, 250);

                    // clean up when PiP window is closed
                    pipWindow.addEventListener("pagehide", () => {
                        clearInterval(updateInterval);
                        if (originalParent && video) {
                            originalParent.appendChild(video);
                            video.play().catch(() => {});
                        }
                    });
                } catch (err) {
                    console.error("[YEAH] PiP failed:", err);
                }
            });
        }

        if (!isEnabled) {
            if (pipBtn) pipBtn.style.display = "none";
            return;
        }
        pipBtn.style.display = "unset";
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
