// texts: style settings
const textStyleSettings = {
    "text-videoTitleFull-home": {
        styleIdDynamic: "text-videoTitleFull-home-inject-dynamic",
        cssDynamicGen: (isEnabled) => {
            if (!isEnabled) return "";
            return `${HOME_ITEMS_VIDEOS} .yt-lockup-metadata-view-model__title {
                display: block !important;
                max-height: unset !important;
            }`;
        },
    },
    "text-videoTitleFull-sidebar": {
        styleIdDynamic: "text-videoTitleFull-sidebar-inject-dynamic",
        cssDynamicGen: (isEnabled) => {
            if (!isEnabled) return "";
            return `${WATCH_SIDEBAR_VIDEOS} .yt-lockup-metadata-view-model__title {
                display: block !important;
                max-height: unset !important;
            }
            ${WATCH_SIDEBAR_VIDEOS} .yt-lockup-view-model__content-image .ytThumbnailViewModelHost {
                align-self: center !important;
            }`;
        },
    },
    "text-videoTitleFull-plPanel": {
        styleIdDynamic: "text-videoTitleFull-plPanel-inject-dynamic",
        cssDynamicGen: (isEnabled) => {
            if (!isEnabled) return "";
            return `${WATCH_SIDEBAR_PLPANEL_VIDEOS} #wc-endpoint #video-title {
                display: block !important;
                max-height: unset !important;
            }                
            ${WATCH_SIDEBAR_PLPANEL_VIDEOS} #wc-endpoint #thumbnail-container {
                align-self: center !important;
            }`;
        },
    },

    "text-plTitleFull-home": {
        styleIdDynamic: "text-plTitleFull-home-inject-dynamic",
        cssDynamicGen: (isEnabled) => {
            if (!isEnabled) return "";
            return `${HOME_ITEMS_PLAYLIST} .yt-lockup-metadata-view-model__title {
                display: block !important;
                max-height: unset !important;
            }`;
        },
    },
    "text-plInfoFull-all": {
        styleIdDynamic: "text-plInfoFull-all-inject-dynamic",
        cssDynamicGen: (isEnabled) => {
            if (!isEnabled) return "";
            return `${HOME_ITEMS_PLAYLIST} .yt-content-metadata-view-model__metadata-text{
                white-space: unset !important;
            }
            ${WATCH_SIDEBAR_PLPANEL} #header-description h3:has([link-inherit-color]) yt-formatted-string {
                display: block !important;
                max-height: unset !important;
            }
            ${WATCH_SIDEBAR_PLPANEL} #header-description h3:not(:has([link-inherit-color])) yt-formatted-string {
                white-space: unset !important;
            }
            ${WATCH_SIDEBAR_PLPANEL} #publisher-container yt-formatted-string.byline-title {
                white-space: unset !important;
                max-height: unset !important;
            }`;
        },
    },

    "text-shortsTitleFull-all": {
        styleIdDynamic: "text-shortsTitleFull-all-inject-dynamic",
        cssDynamicGen: (isEnabled) => {
            if (!isEnabled) return "";
            return `${HOME_ITEMS_SHORTS} .shortsLockupViewModelHostMetadataTitle,
            ${WATCH_SIDEBAR_SHELVES_SHORTS_VIDEOS} .shortsLockupViewModelHostMetadataTitle {
                display: block !important;
                max-height: unset !important;
            }`;
        },
    },

    "text-channelInfoFull-player": {
        styleIdDynamic: "text-channelInfoFull-player-inject-dynamic",
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
    "text-joinMbsBtnFix-player": {
        styleIdDynamic: "text-joinMbsBtnFix-player-inject-dynamic",
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
