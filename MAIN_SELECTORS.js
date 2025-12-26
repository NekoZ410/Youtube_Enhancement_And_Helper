// patterns
const PATTERN_YT_VIDEO_URL = /https:\/\/www\.youtube\.com\/watch\?v=[a-zA-Z0-9_-]{11}/;

// selectors - home
const MAIN_HOME = "#contents.ytd-rich-grid-renderer";

// ==================================================
const HOME_ITEMS = MAIN_HOME + " ytd-rich-item-renderer:not(:has(ytd-ad-slot-renderer)):not(ytd-continuation-item-renderer)";
const ITEMS_CELLS = HOME_ITEMS + ":has(yt-lockup-view-model):not(.ytd-rich-shelf-renderer)";

const CELLS_VIDEOS = ITEMS_CELLS + ":has(.yt-core-attributed-string__link)";
const CELLS_VIDEOS_NORMAL = CELLS_VIDEOS + ':not(:has(.yt-lockup-view-model__content-image[href*="&list="]))';
const CELLS_VIDEOS_PLTRAP = CELLS_VIDEOS + ':has(.yt-lockup-view-model__content-image[href*="&list="])';

const CELLS_VIDEOS_COLLAB = ITEMS_CELLS + ':not(:has(.yt-core-attributed-string__link)):not(:has(.yt-lockup-view-model__content-image[href*="&list="]))';

const CELLS_PLAYLISTS = ITEMS_CELLS + ':not(:has(.yt-core-attributed-string__link)):has(.yt-lockup-view-model__content-image[href*="&list="])';

// ==================================================
const HOME_SECTIONS = MAIN_HOME + " ytd-rich-section-renderer";

const SECTION_SHORTSSHELVES = HOME_SECTIONS + ":has([is-shorts])";
const SECTION_SHORTSSHELVES_SHORTS = SECTION_SHORTSSHELVES + " ytd-rich-item-renderer";

const SECTION_POSTSSHELVES = HOME_SECTIONS + ":has([is-post])";
const SECTION_POSTSSHELVES_POSTS = SECTION_POSTSSHELVES + " ytd-rich-item-renderer";

const SECTION_OTHERS = HOME_SECTIONS + ":not(:has([is-shorts])):not(:has([is-post]))";
const SECTION_OTHERS_VIDEOS = SECTION_OTHERS + " ytd-rich-item-renderer";

// selectors - watch
const WATCH_MAIN = "#primary";

const MAIN_PLRCTN = WATCH_MAIN + " #player";
const MAIN_PLRCTN_PLAYER = MAIN_PLRCTN + " #movie_player";

const PLRCTN_PLAYER_RELATEDVIDEOSCTN = MAIN_PLRCTN_PLAYER + " .ytp-fullscreen-grid-main-content";
const PLRCTN_PLAYER_RELATEDVIDEOSCTN_VIDEOS = PLRCTN_PLAYER_RELATEDVIDEOSCTN + " .ytp-modern-videowall-still";

const MAIN_BIGMODE = "#full-bleed-container";
const MAIN_BIGMODE_PLRCTN_PLAYER = MAIN_BIGMODE + " #movie_player";

const BIGMODE_PLRCTN_PLAYER_RELATEDVIDEOSCTN = MAIN_BIGMODE_PLRCTN_PLAYER + " .ytp-fullscreen-grid-main-content";
const BIGMODE_PLRCTN_PLAYER_RELATEDVIDEOSCTN_VIDEOS = BIGMODE_PLRCTN_PLAYER_RELATEDVIDEOSCTN + " .ytp-modern-videowall-still";

const MAIN_BELOW = WATCH_MAIN + " #below";
const MAIN_BELOW_METADATA = MAIN_BELOW + " ytd-watch-metadata";
const MAIN_BELOW_TOPROW = MAIN_BELOW_METADATA + " #top-row";

const MAIN_BELOW_COMMENTS = MAIN_BELOW + " #comments";

// ==================================================
const WATCH_SIDEBAR = "#secondary";

const SIDEBAR_VIDEOS = WATCH_SIDEBAR + " #related #contents .yt-lockup-view-model--wrapper";
const SIDEBAR_VIDEOS_NORMAL = SIDEBAR_VIDEOS + ':not(:has(.yt-lockup-view-model__content-image[href*="&list="]))';
const SIDEBAR_VIDEOS_PLTRAP = SIDEBAR_VIDEOS + ':has(.yt-lockup-view-model__content-image[href*="&list="])';

const SIDEBAR_SHORTSSHELVES = WATCH_SIDEBAR + " #related #contents ytd-reel-shelf-renderer";
const SIDEBAR_SHORTSSHELVES_SHORTS = SIDEBAR_SHORTSSHELVES + " ytm-shorts-lockup-view-model";

const SIDEBAR_PLPANEL = WATCH_SIDEBAR + " #playlist";
const SIDEBAR_PLPANEL_VIDEOS = SIDEBAR_PLPANEL + " .playlist-items ytd-playlist-panel-video-renderer";
const SIDEBAR_PLPANEL_VIDEOS_NORMAL = SIDEBAR_PLPANEL_VIDEOS + ':not(:has(#wc-endpoint[href*="&list="]))';
const SIDEBAR_PLPANEL_VIDEOS_PLTRAP = SIDEBAR_PLPANEL_VIDEOS + ':has(#wc-endpoint[href*="&list="])';
