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
    "texts-videoChannelNameFull-all": {
        styleIdDynamic: "texts-videoChannelNameFull-all-inject-dynamic",
        cssDynamicGen: (isEnabled) => {
            if (!isEnabled) return "";
            return `${CELLS_VIDEOS} .yt-core-attributed-string__link,
            ${CELLS_VIDEOS_COLLAB} .yt-core-attributed-string__link,
            ${SECTION_OTHERS_VIDEOS} .yt-core-attributed-string__link,
            ${SIDEBAR_VIDEOS} .yt-content-metadata-view-model__metadata-text:nth-of-type(1),
            ${SIDEBAR_PLPANEL_VIDEOS} #byline {
                max-height: unset !important;
                white-space: normal !important;
                word-break: break-word !important;
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
            ytd-video-owner-renderer,
            #subscribe-button {
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
