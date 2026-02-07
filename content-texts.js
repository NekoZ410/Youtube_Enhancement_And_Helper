// texts: style settings
const textStyleSettings = {
    "texts-videoTitleFull-home": {
        styleIdDynamic: "texts-videoTitleFull-home-inject-dynamic",
        cssDynamicGen: (isEnabled) => {
            if (!isEnabled) return "";
            return `${CELLS_VIDEOS} .yt-lockup-metadata-view-model__title,
                    ${CELLS_VIDEOS_COLLAB} .yt-lockup-metadata-view-model__title,
                    ${SECTION_OTHERS_VIDEOS} .yt-lockup-metadata-view-model__title {
                display: block !important;
                max-height: unset !important;
            }`;
        },
    },
    "texts-videoTitleFull-sidebar": {
        styleIdDynamic: "texts-videoTitleFull-sidebar-inject-dynamic",
        cssDynamicGen: (isEnabled) => {
            if (!isEnabled) return "";
            return `${SIDEBAR_VIDEOS} .yt-lockup-metadata-view-model__title {
                display: block !important;
                max-height: unset !important;
            }
            ${SIDEBAR_VIDEOS} .yt-lockup-view-model__content-image .ytThumbnailViewModelHost {
                align-self: center !important;
            }`;
        },
    },
    "texts-videoTitleFull-plPanel": {
        styleIdDynamic: "texts-videoTitleFull-plPanel-inject-dynamic",
        cssDynamicGen: (isEnabled) => {
            if (!isEnabled) return "";
            return `${SIDEBAR_PLPANEL_VIDEOS} #wc-endpoint #video-title {
                display: block !important;
                max-height: unset !important;
            }                
            ${SIDEBAR_PLPANEL_VIDEOS} #wc-endpoint #thumbnail-container {
                align-self: center !important;
            }`;
        },
    },
    "texts-relatedVideoTitleFull-player": {
        styleIdDynamic: "texts-relatedVideoTitleFull-player-inject-dynamic",
        cssDynamicGen: (isEnabled) => {
            if (!isEnabled) return "";
            return `${PLRCTN_PLAYER_RELATEDVIDEOSCTN_VIDEOS} .ytp-modern-videowall-still-info-title, 
            ${BIGMODE_PLRCTN_PLAYER_RELATEDVIDEOSCTN_VIDEOS} .ytp-modern-videowall-still-info-title {
                display: block !important;
                white-space: normal !important;
            }`;
        },
    },
    "texts-videoChannelNameFull-all": {
        styleIdDynamic: "texts-videoChannelNameFull-all-inject-dynamic",
        cssDynamicGen: (isEnabled) => {
            if (!isEnabled) return "";
            return `${CELLS_VIDEOS} .yt-core-attributed-string__link,
            ${CELLS_VIDEOS_COLLAB} .yt-core-attributed-string__link,
            ${SECTION_OTHERS_VIDEOS} .yt-core-attributed-string__link,
            ${SIDEBAR_VIDEOS_NORMAL} .yt-content-metadata-view-model__metadata-row:nth-of-type(1) .yt-content-metadata-view-model__metadata-text,
            ${SIDEBAR_VIDEOS_PLTRAP} .yt-content-metadata-view-model__metadata-row:nth-of-type(1) .yt-content-metadata-view-model__metadata-text,
            ${SIDEBAR_PLPANEL_VIDEOS} #byline,
            ${PLRCTN_PLAYER_RELATEDVIDEOSCTN_VIDEOS} .ytp-modern-videowall-still-info-author, 
            ${BIGMODE_PLRCTN_PLAYER_RELATEDVIDEOSCTN_VIDEOS} .ytp-modern-videowall-still-info-author {
                max-height: unset !important;
                white-space: normal !important;
                word-break: break-word !important;
            }`;
        },
    },
    "texts-videoInfoFull-all": {
        styleIdDynamic: "texts-videoInfoFull-all-inject-dynamic",
        cssDynamicGen: (isEnabled) => {
            if (!isEnabled) return "";
            return `${CELLS_VIDEOS} .yt-content-metadata-view-model__metadata-row:nth-of-type(2),
            ${CELLS_VIDEOS_COLLAB} .yt-content-metadata-view-model__metadata-row:nth-of-type(2), 
            ${SECTION_OTHERS_VIDEOS} .yt-content-metadata-view-model__metadata-row:nth-of-type(2), 
            ${SIDEBAR_VIDEOS} .yt-content-metadata-view-model__metadata-row:nth-of-type(2) {
                flex-wrap: wrap;
            }
            ${CELLS_VIDEOS} .yt-content-metadata-view-model__metadata-row:nth-of-type(2) .yt-content-metadata-view-model__metadata-text,
            ${CELLS_VIDEOS_COLLAB} .yt-content-metadata-view-model__metadata-row:nth-of-type(2) .yt-content-metadata-view-model__metadata-text, 
            ${SECTION_OTHERS_VIDEOS} .yt-content-metadata-view-model__metadata-row:nth-of-type(2) .yt-content-metadata-view-model__metadata-text, 
            ${SIDEBAR_VIDEOS} .yt-content-metadata-view-model__metadata-row:nth-of-type(2) .yt-content-metadata-view-model__metadata-text, 
            ${PLRCTN_PLAYER_RELATEDVIDEOSCTN_VIDEOS} .ytp-modern-videowall-still-view-count-and-date-info, 
            ${BIGMODE_PLRCTN_PLAYER_RELATEDVIDEOSCTN_VIDEOS} .ytp-modern-videowall-still-view-count-and-date-info {
                max-height: unset !important;
                white-space: normal !important;
                word-break: break-word !important;
            }
            ${PLRCTN_PLAYER_RELATEDVIDEOSCTN_VIDEOS} .ytp-modern-videowall-still-info-live, 
            ${BIGMODE_PLRCTN_PLAYER_RELATEDVIDEOSCTN_VIDEOS} .ytp-modern-videowall-still-info-live {
                position: unset;
                width: fit-content;
                padding: 4px 2px 2px;
            }`;
        },
    },

    "texts-plTitleFull-home": {
        styleIdDynamic: "texts-plTitleFull-home-inject-dynamic",
        cssDynamicGen: (isEnabled) => {
            if (!isEnabled) return "";
            return `${CELLS_PLAYLISTS} .yt-lockup-metadata-view-model__title {
                display: block !important;
                max-height: unset !important;
            }`;
        },
    },
    "texts-plInfoFull-all": {
        styleIdDynamic: "texts-plInfoFull-all-inject-dynamic",
        cssDynamicGen: (isEnabled) => {
            if (!isEnabled) return "";
            return `${CELLS_PLAYLISTS} .yt-content-metadata-view-model__metadata-text{
                white-space: unset !important;
            }
            ${SIDEBAR_PLPANEL} #header-description h3:has([link-inherit-color]) yt-formatted-string {
                display: block !important;
                max-height: unset !important;
            }
            ${SIDEBAR_PLPANEL} #header-description h3:not(:has([link-inherit-color])) yt-formatted-string {
                white-space: unset !important;
            }
            ${SIDEBAR_PLPANEL} #publisher-container yt-formatted-string.byline-title {
                white-space: unset !important;
                max-height: unset !important;
            }
            ${SIDEBAR_VIDEOS_PLMIX} .yt-content-metadata-view-model__metadata-row:nth-of-type(1) .yt-content-metadata-view-model__metadata-text {
                max-height: unset !important;
                white-space: normal !important;
                word-break: break-word !important;
            }`;
        },
    },

    "texts-shortsTitleFull-all": {
        styleIdDynamic: "texts-shortsTitleFull-all-inject-dynamic",
        cssDynamicGen: (isEnabled) => {
            if (!isEnabled) return "";
            return `${SECTION_SHORTSSHELVES_SHORTS} .shortsLockupViewModelHostMetadataTitle,
            ${SIDEBAR_SHORTSSHELVES_SHORTS} .shortsLockupViewModelHostMetadataTitle {
                display: block !important;
                max-height: unset !important;
            }`;
        },
    },

    "texts-channelInfoFull-player": {
        styleIdDynamic: "texts-channelInfoFull-player-inject-dynamic",
        cssDynamicGen: (isEnabled) => {
            if (!isEnabled) return "";
            return `#upload-info {
                margin-right: 5px !important;
                overflow: unset !important;
                flex: 0 1 auto !important;
                justify-content: center !important;
                display: flex !important;
            }
            #upload-info #owner-sub-count {
                flex-shrink: 0;
                white-space: nowrap;
            }`;
        },
    },
    "texts-joinMbsBtnFix-player": {
        styleIdDynamic: "texts-joinMbsBtnFix-player-inject-dynamic",
        cssDynamicGen: (isEnabled) => {
            if (!isEnabled) return "";
            return `#owner {
                flex-direction: row !important;
                align-items: center !important;
                gap: 10px !important;
                display: flex !important;
            }
            ytd-video-owner-renderer, #subscribe-button {
                flex: 0 0 auto !important;
            }`;
        },
    },
};

// texts: init settings on load
initModuleSettings(TEXTS_DEFAULT_SETTINGS, (settings) => {
    applyModuleStyles(settings, textStyleSettings);
});

// texts: listen for storage changes
setupModuleStorageListener(TEXTS_DEFAULT_SETTINGS, (settings) => {
    applyModuleStyles(settings, textStyleSettings);
});
