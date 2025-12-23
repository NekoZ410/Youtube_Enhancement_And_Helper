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

const WATCH_MAIN_PLRCONT = WATCH_MAIN + " #player";
const WATCH_MAIN_PLRCONT_PLAYER = WATCH_MAIN_PLRCONT + " #movie_player";
const WATCH_MAIN_PLRCONT_PLAYER_GRADTOP = WATCH_MAIN_PLRCONT_PLAYER + " .ytp-gradient-top";
const WATCH_MAIN_PLRCONT_PLAYER_GRADBOTTOM = WATCH_MAIN_PLRCONT_PLAYER + " .ytp-gradient-bottom";

const WATCH_MAIN_BIGMODE = "#full-bleed-container";
const WATCH_MAIN_BIGMODE_PLRCONT_PLAYER = WATCH_MAIN_BIGMODE + " #movie_player";
const WATCH_MAIN_BIGMODE_PLRCONT_PLAYER_GRADTOP = WATCH_MAIN_BIGMODE + " .ytp-gradient-top";
const WATCH_MAIN_BIGMODE_PLRCONT_PLAYER_GRADBOTTOM = WATCH_MAIN_BIGMODE + " .ytp-gradient-bottom";

const WATCH_MAIN_BELOW = WATCH_MAIN + " #below";
const WATCH_MAIN_BELOW_METADATA = WATCH_MAIN_BELOW + " ytd-watch-metadata";
const WATCH_MAIN_BELOW_TOPROW = WATCH_MAIN_BELOW_METADATA + " #top-row";

const WATCH_MAIN_BELOW_COMMENTS = WATCH_MAIN_BELOW + " #comments";

// ==================================================
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
