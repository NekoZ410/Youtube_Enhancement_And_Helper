// patterns
const PATTERN_YT_VIDEO_URL = /https:\/\/www\.youtube\.com\/watch\?v=[a-zA-Z0-9_-]{11}/;

// selectors - home
const HOME = "#contents #content:not(.ytd-expander):not(:has(ytd-ad-slot-renderer))";

const HOME_ITEMS = HOME + ":not(.ytd-rich-section-renderer)";
const HOME_ITEMS_VIDEOS = HOME_ITEMS + ":not(:has(ytm-shorts-lockup-view-model)):not(:has(ytd-post-renderer)):has(.yt-core-attributed-string__link)";
const HOME_ITEMS_VIDEOS_NORMAL = HOME_ITEMS_VIDEOS + ':not(:has(.yt-lockup-view-model__content-image[href*="&list="]))';
const HOME_ITEMS_VIDEOS_PLTRAP = HOME_ITEMS_VIDEOS + ':has(.yt-lockup-view-model__content-image[href*="&list="])';
const HOME_ITEMS_PLAYLIST = HOME_ITEMS + ":not(:has(ytm-shorts-lockup-view-model)):not(:has(ytd-post-renderer)):not(:has(.yt-core-attributed-string__link))";

const HOME_ITEMS_SHORTS = HOME_ITEMS + " ytm-shorts-lockup-view-model";
const HOME_ITEMS_POSTS = HOME_ITEMS + " ytd-post-renderer";

const HOME_SECTIONS = HOME + " .ytd-rich-section-renderer";

// selectors - watch
const WATCH_MAIN = "#primary";

const WATCH_MAIN_PLAYER = WATCH_MAIN + " #player";

const WATCH_MAIN_BELOW = WATCH_MAIN + " #below";
const WATCH_MAIN_BELOW_METADATA = WATCH_MAIN_BELOW + " ytd-watch-metadata";
const WATCH_MAIN_BELOW_TOPROW = WATCH_MAIN_BELOW_METADATA + " #top-row";

const WATCH_MAIN_BELOW_COMMENTS = WATCH_MAIN_BELOW + " #comments";

const WATCH_SIDEBAR = "#secondary";

const WATCH_SIDEBAR_VIDEOS = WATCH_SIDEBAR + " #related #contents .yt-lockup-view-model--wrapper";
const WATCH_SIDEBAR_VIDEOS_NORMAL = WATCH_SIDEBAR_VIDEOS + ':not(:has(.yt-lockup-view-model__content-image[href*="&list="]))';
const WATCH_SIDEBAR_VIDEOS_PLTRAP = WATCH_SIDEBAR_VIDEOS + ':has(.yt-lockup-view-model__content-image[href*="&list="])';

const WATCH_SIDEBAR_SHELVES_SHORTS = WATCH_SIDEBAR + " #related #contents ytd-reel-shelf-renderer";
const WATCH_SIDEBAR_SHELVES_SHORTS_VIDEOS = WATCH_SIDEBAR_SHELVES_SHORTS + " ytm-shorts-lockup-view-model";

const WATCH_SIDEBAR_PLPANEL = WATCH_SIDEBAR + " #playlist";
const WATCH_SIDEBAR_PLPANEL_VIDEOS = WATCH_SIDEBAR_PLPANEL + " .playlist-items ytd-playlist-panel-video-renderer";
const WATCH_SIDEBAR_PLPANEL_VIDEOS_NORMAL = WATCH_SIDEBAR_PLPANEL_VIDEOS + ':not(:has(#wc-endpoint[href*="&list="]))';
const WATCH_SIDEBAR_PLPANEL_VIDEOS_PLTRAP = WATCH_SIDEBAR_PLPANEL_VIDEOS + ':has(#wc-endpoint[href*="&list="])';
