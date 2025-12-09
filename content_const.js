// patterns
const PATTERN_YT_VIDEO_URL = /https:\/\/www\.youtube\.com\/watch\?v=[a-zA-Z0-9_-]{11}/;

// home selectors
const HOME_ITEMS = "#contents #content:not(.ytd-expander):not(:has(ytd-ad-slot-renderer)):not(.ytd-rich-section-renderer)";
const HOME_ITEMS_SHORTS = HOME_ITEMS + " ytm-shorts-lockup-view-model";
const HOME_ITEMS_POSTS = HOME_ITEMS + " ytd-post-renderer";
const HOME_ITEMS_PLAYLIST = HOME_ITEMS + ":not(:has(ytm-shorts-lockup-view-model)):not(:has(ytd-post-renderer)):not(:has(.yt-core-attributed-string__link))";
const HOME_ITEMS_VIDEOS = HOME_ITEMS + ":not(:has(ytm-shorts-lockup-view-model)):not(:has(ytd-post-renderer)):has(.yt-core-attributed-string__link)";
const HOME_ITEMS_VIDEOS_NORMAL = HOME_ITEMS_VIDEOS + ':not(:has(.yt-lockup-view-model__content-image[href*="&list="]))';
const HOME_ITEMS_VIDEOS_PLTRAP = HOME_ITEMS_VIDEOS + ':has(.yt-lockup-view-model__content-image[href*="&list="])';

const HOME_SECTIONS = "#contents #content:not(.ytd-expander):not(:has(ytd-ad-slot-renderer)) .ytd-rich-section-renderer";

// watch selectors
const WATCH_SIDEBAR_VIDEOS = "#items #contents .yt-lockup-view-model--wrapper";
const WATCH_SIDEBAR_VIDEOS_NORMAL = WATCH_SIDEBAR_VIDEOS + ':not(:has(.yt-lockup-view-model__content-image[href*="&list="]))';
const WATCH_SIDEBAR_VIDEOS_PLTRAP = WATCH_SIDEBAR_VIDEOS + ':has(.yt-lockup-view-model__content-image[href*="&list="])';
const WATCH_SIDEBAR_SHELVES_SHORTS = "#items #contents ytd-reel-shelf-renderer";
const WATCH_SIDEBAR_SHELVES_SHORTS_VIDEOS = WATCH_SIDEBAR_SHELVES_SHORTS + " ytm-shorts-lockup-view-model";

const WATCH_SIDEBAR_VIDEOS_ALT = "#related #items .yt-lockup-view-model--wrapper";
const WATCH_SIDEBAR_VIDEOS_NORMAL_ALT = WATCH_SIDEBAR_VIDEOS_ALT + ':not(:has(.yt-lockup-view-model__content-image[href*="&list="]))';
const WATCH_SIDEBAR_VIDEOS_PLTRAP_ALT = WATCH_SIDEBAR_VIDEOS_ALT + ':has(.yt-lockup-view-model__content-image[href*="&list="])';
const WATCH_SIDEBAR_SHELVES_SHORTS_ALT = "#related #items ytd-reel-shelf-renderer";
const WATCH_SIDEBAR_SHELVES_SHORTS_VIDEOS_ALT = WATCH_SIDEBAR_SHELVES_SHORTS_ALT + " ytm-shorts-lockup-view-model";

