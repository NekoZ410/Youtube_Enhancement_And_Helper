// texts: style settings
const textStyleSettings = {
    "text-videoTitleFull-home": {
        styleIdDynamic: "text-videoTitleFull-home-inject-dynamic",
        cssDynamicGen: (isEnabled) => {
            if (!isEnabled) return "";
            return `#contents #content .yt-lockup-metadata-view-model__title:not([href*="&list="]) {
                display: block !important;
                max-height: unset !important;
            }`;
        },
    },
    "text-videoTitleFull-sidebar": {
        styleIdDynamic: "text-videoTitleFull-sidebar-inject-dynamic",
        cssDynamicGen: (isEnabled) => {
            if (!isEnabled) return "";
            return `#items #contents .yt-lockup-metadata-view-model__title:not([href*="&list="]) {
                display: block !important;
                max-height: unset !important;
            }
            #items #contents .yt-lockup-view-model__content-image:not([href*="&list="]) .ytThumbnailViewModelHost {
                align-self: center;
            }`;
        },
    },
    "text-videoTitleFull-plPanel": {
        styleIdDynamic: "text-videoTitleFull-plPanel-inject-dynamic",
        cssDynamicGen: (isEnabled) => {
            if (!isEnabled) return "";
            return `#video-title.ytd-playlist-panel-video-renderer {
                display: block !important;
                max-height: unset !important;
            }                
            #items #thumbnail-container {
                align-self: anchor-center;
            }`;
        },
    },

    "text-plTitleFull-home": {
        styleIdDynamic: "text-plTitleFull-home-inject-dynamic",
        cssDynamicGen: (isEnabled) => {
            if (!isEnabled) return "";
            return `#contents #content .yt-lockup-metadata-view-model__title[href*="&list="] {
                display: block !important;
                max-height: unset !important;
            }`;
        },
    },
    "text-plTitleFull-sidebar": {
        styleIdDynamic: "text-plTitleFull-sidebar-inject-dynamic",
        cssDynamicGen: (isEnabled) => {
            if (!isEnabled) return "";
            return `#items #contents .yt-lockup-metadata-view-model__title[href*="&list="] {
                display: block !important;
                max-height: unset !important;
            }
            #items #contents .yt-lockup-view-model__content-image[href*="&list="] .ytThumbnailViewModelHost {
                align-self: center;
            }
            #items #contents .yt-lockup-view-model__content-image[href*="&list="] .ytCollectionThumbnailViewModelHost {
                align-content: center;
            }`;
        },
    },
    "text-plTitleFull-plPanel": {
        styleIdDynamic: "text-plTitleFull-plPanel-inject-dynamic",
        cssDynamicGen: (isEnabled) => {
            if (!isEnabled) return "";
            return `.title.ytd-playlist-panel-renderer {
                display: block !important;
                max-height: unset !important;
            }
            #next-video-title yt-formatted-string {
                white-space: unset !important;
            }
            #publisher-container yt-formatted-string {
                white-space: unset;
                max-height: unset;
            }`;
        },
    },
    "text-plInfoFull-all": {
        styleIdDynamic: "text-plInfoFull-all-inject-dynamic",
        cssDynamicGen: (isEnabled) => {
            if (!isEnabled) return "";
            return `#contents .yt-content-metadata-view-model > .yt-content-metadata-view-model__metadata-row:first-child .yt-core-attributed-string[role="text"] {
                white-space: unset !important;
            }`;
        },
    },

    "text-shortsTitleFull-all": {
        styleIdDynamic: "text-shortsTitleFull-all-inject-dynamic",
        cssDynamicGen: (isEnabled) => {
            if (!isEnabled) return "";
            return `.shortsLockupViewModelHostMetadataTitle {
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
