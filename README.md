# YouTube Enhancement And Helper (YEAH)

<center>

![ui-videosPerRow-home_disabled](https://github.com/NekoZ410/Youtube_Enhancement_And_Helper/blob/main/images/icons/icon64.png?raw=true)

</center>

A self-made Chromium extension that add some enhancements and helper features to [YouTube](https://www.youtube.com/).

> If you like this extension, please give me a [star](#:~:text=Star).

## Install
1. Clone or [download this repo as zip](https://github.com/NekoZ410/Youtube_Enhancement_And_Helper/archive/refs/heads/main.zip) then extract.
2. Open browser, go to Extension page, enable `Developer mode` option.
3. Click `Load unpacked`, open the cloned repo or extracted folder (now a new icon will be added to extension bar, pin it as you like).

## Usage
Just click this extension icon to open popup menu when you're on [Youtube](https://www.youtube.com/).

## Table of Contents
  - [UI Features](#ui-features)
    - [1. Custom number of videos per row (Home page)](#1-custom-number-of-videos-per-row-home-page)
    - [2. Custom number of shorts per row (Home page)](#2-custom-number-of-shorts-per-row-home-page)
    - [3. Custom number of posts per row (Home page)](#3-custom-number-of-posts-per-row-home-page)
    - [4. Custom number of others per row (Home page)](#4-custom-number-of-others-per-row-home-page)
    - [5. Custom number of related videos per row (Player)](#5-custom-number-of-related-videos-per-row-player)
    - [6. Fix menu buttons position](#6-fix-menu-buttons-position)
  - [Texts Features](#texts-features)
    - [1. Display full video title (Home page)](#1-display-full-video-title-home-page)
    - [2. Display full video title (Player sidebar)](#2-display-full-video-title-player-sidebar)
    - [3. Display full video title (Playlist panel)](#3-display-full-video-title-playlist-panel)
    - [4. Display full related video title (Player)](#4-display-full-related-video-title-player)
    - [5. Display full channel name](#5-display-full-channel-name)
    - [6. Display full video info](#6-display-full-video-info)
    - [7. Display full playlist title (Home page)](#7-display-full-playlist-title-home-page)
    - [8. Display full playlist info](#8-display-full-playlist-info)
    - [9. Display full shorts title](#9-display-full-shorts-title)
    - [0. Display full channel info](#0-display-full-channel-info)
    - [0. Fix "Join" Membership button](#0-fix-join-membership-button)
  - [Player Features](#player-features)
    - [1. Custom controls bar background](#1-custom-controls-bar-background)
    - [2. Persistent progress bar](#2-persistent-progress-bar)
  - [Utilities Features](#utilities-features)
    - [1. Watch shorts in '/watch' view](#1-watch-shorts-in-watch-view)
    - [2. Watch video without trapped into a playlist](#2-watch-video-without-trapped-into-a-playlist)
    - [3. Improve channel redirection](#3-improve-channel-redirection)

## UI Features
### 1. Custom number of videos per row (Home page)
- Disabled: Default with 3 videos per row.

![ui-videosPerRow-home_disabled](https://github.com/NekoZ410/Youtube_Enhancement_And_Helper/blob/main/images/readme/ui-videosPerRow-home_disabled.png?raw=true)

- Enabled: Customized with 5 videos per row. [^1]

![ui-videosPerRow-home_enabled](https://github.com/NekoZ410/Youtube_Enhancement_And_Helper/blob/main/images/readme/ui-videosPerRow-home_enabled.png?raw=true)

### 2. Custom number of shorts per row (Home page)
- Disabled: Default with 5 shorts per row

![ui-shortsPerRow-home_disabled](https://github.com/NekoZ410/Youtube_Enhancement_And_Helper/blob/main/images/readme/ui-shortsPerRow-home_disabled.png?raw=true)

- Enabled: Customized with 9 shorts per row. [^2]

![ui-shortsPerRow-home_enabled](https://github.com/NekoZ410/Youtube_Enhancement_And_Helper/blob/main/images/readme/ui-shortsPerRow-home_enabled.png?raw=true)

### 3. Custom number of posts per row (Home page)

> (no image due to randomness behavior of this shelf, update later)

### 4. Custom number of others per row (Home page)
- Disabled: Default with 3 videos per row.

![ui-othersPerRow-home_disabled](https://github.com/NekoZ410/Youtube_Enhancement_And_Helper/blob/main/images/readme/ui-othersPerRow-home_disabled.png?raw=true)

- Enabled: Customized with 5 videos per row.

![ui-othersPerRow-home_enabled](https://github.com/NekoZ410/Youtube_Enhancement_And_Helper/blob/main/images/readme/ui-othersPerRow-home_enabled.png?raw=true)

### 5. Custom number of related videos per row (Player)
- Disabled: Default with 3 videos per row.

![ui-relatedVideosPerRow-player_disabled](https://github.com/NekoZ410/Youtube_Enhancement_And_Helper/blob/main/images/readme/ui-relatedVideosPerRow-player_disabled.png)

- Enabled: Customized with 4 videos per row (bonus show all hidden ones).

![ui-relatedVideosPerRow-player_enabled](https://github.com/NekoZ410/Youtube_Enhancement_And_Helper/blob/main/images/readme/ui-relatedVideosPerRow-player_enabled.png?raw=true)

### 6. Fix menu buttons position
- Disabled: Default menu buttons may shrink inward of true position if videos title is too short sometimes.
  - Home:

  ![ui-menuBtnPosFix-all_home_disabled](https://github.com/NekoZ410/Youtube_Enhancement_And_Helper/blob/main/images/readme/ui-menuBtnPosFix-all_home_disabled.png?raw=true)

  - Sidebar:

  ![ui-menuBtnPosFix-all_sidebar_disabled](https://github.com/NekoZ410/Youtube_Enhancement_And_Helper/blob/main/images/readme/ui-menuBtnPosFix-all_sidebar_disabled.png?raw=true)

- Enabled: Customized menu buttons fixed to their true position.
  - Home:
  
  ![ui-menuBtnPosFix-all_home_enabled](https://github.com/NekoZ410/Youtube_Enhancement_And_Helper/blob/main/images/readme/ui-menuBtnPosFix-all_home_enabled.png?raw=true)

  - Sidebar:

  ![ui-menuBtnPosFix-all_sidebar_enabled](https://github.com/NekoZ410/Youtube_Enhancement_And_Helper/blob/main/images/readme/ui-menuBtnPosFix-all_sidebar_enabled.png?raw=true)

## Texts Features
### 1. Display full video title (Home page)
- Disabled: Default only displays 2 lines and an ellipsis at the end when the title is too long.

![texts-videoTitleFull-home_disabled](https://github.com/NekoZ410/Youtube_Enhancement_And_Helper/blob/main/images/readme/texts-videoTitleFull-home_disabled.png?raw=true)

- Enabled: Customized to display the entire title with automatic spacing and line breaks based on length.

![texts-videoTitleFull-home_enabled](https://github.com/NekoZ410/Youtube_Enhancement_And_Helper/blob/main/images/readme/texts-videoTitleFull-home_enabled.png?raw=true)

### 2. Display full video title (Player sidebar)
- Disabled: Default only displays 2 lines and an ellipsis at the end when the title is too long.

![texts-videoTitleFull-sidebar_disabled](https://github.com/NekoZ410/Youtube_Enhancement_And_Helper/blob/main/images/readme/texts-videoTitleFull-sidebar_disabled.png?raw=true)

- Enabled: Customized to display the entire title with automatic spacing and line breaks based on length.

![texts-videoTitleFull-sidebar_enabled](https://github.com/NekoZ410/Youtube_Enhancement_And_Helper/blob/main/images/readme/texts-videoTitleFull-sidebar_enabled.png?raw=true)

### 3. Display full video title (Playlist panel)
- Disabled: Default only displays 2 lines and an ellipsis at the end when the title is too long.

![texts-videoTitleFull-plPanel_disabled](https://github.com/NekoZ410/Youtube_Enhancement_And_Helper/blob/main/images/readme/texts-videoTitleFull-plPanel_disabled.png?raw=true)

- Enabled: Customized to display the entire title with automatic spacing and line breaks based on length.

![texts-videoTitleFull-plPanel_enabled](https://github.com/NekoZ410/Youtube_Enhancement_And_Helper/blob/main/images/readme/texts-videoTitleFull-plPanel_enabled.png?raw=true)

### 4. Display full related video title (Player)
- Disabled: Default only displays 1 line and overflows when the title is too long.

![texts-relatedVideoTitleFull-player_disabled](https://github.com/NekoZ410/Youtube_Enhancement_And_Helper/blob/main/images/readme/texts-relatedVideoTitleFull-player_disabled.png?raw=true)

- Enabled: Customized to display the entire title with automatic spacing and line breaks based on length.

![texts-relatedVideoTitleFull-player_enabled](https://github.com/NekoZ410/Youtube_Enhancement_And_Helper/blob/main/images/readme/texts-relatedVideoTitleFull-player_enabled.png?raw=true)

### 5. Display full channel name
- Disabled: Default only displays 2 lines and an ellipsis at the end when the name is too long.
  - Home:

  ![texts-videoChannelNameFull-all_home_disabled](https://github.com/NekoZ410/Youtube_Enhancement_And_Helper/blob/main/images/readme/texts-videoChannelNameFull-all_home_disabled.png?raw=true)

  - Sidebar:

  ![texts-videoChannelNameFull-all_sidebar_disabled](https://github.com/NekoZ410/Youtube_Enhancement_And_Helper/blob/main/images/readme/texts-videoChannelNameFull-all_sidebar_disabled.png?raw=true)

  - Playlist panel:

  ![texts-videoChannelNameFull-all_plPanel_disabled](https://github.com/NekoZ410/Youtube_Enhancement_And_Helper/blob/main/images/readme/texts-videoChannelNameFull-all_plPanel_disabled.png?raw=true)

- Enabled: Customized to display the entire channel name with automatic spacing and line breaks based on length.
  - Home:
  
  ![texts-videoChannelNameFull-all_home_enabled](https://github.com/NekoZ410/Youtube_Enhancement_And_Helper/blob/main/images/readme/texts-videoChannelNameFull-all_home_enabled.png?raw=true)

  - Sidebar:

  ![texts-videoChannelNameFull-all_sidebar_enabled](https://github.com/NekoZ410/Youtube_Enhancement_And_Helper/blob/main/images/readme/texts-videoChannelNameFull-all_sidebar_enabled.png?raw=true)

  - Playlist panel:

  ![texts-videoChannelNameFull-all_plPanel_enabled](https://github.com/NekoZ410/Youtube_Enhancement_And_Helper/blob/main/images/readme/texts-videoChannelNameFull-all_plPanel_enabled.png?raw=true)

### 6. Display full video info
- Disabled: Default only displays 1 line, overflows or an ellipsis at the end when the info is too long (in some languages).
  - Home:

  ![texts-videoInfoFull-all_home_disabled](https://github.com/NekoZ410/Youtube_Enhancement_And_Helper/blob/main/images/readme/texts-videoInfoFull-all_home_disabled.png?raw=true)

  - Sidebar:

  ![texts-videoInfoFull-all_sidebar_disabled](https://github.com/NekoZ410/Youtube_Enhancement_And_Helper/blob/main/images/readme/texts-videoInfoFull-all_sidebar_disabled.png?raw=true)

  - Player:

  ![texts-videoInfoFull-all_player_disabled](https://github.com/NekoZ410/Youtube_Enhancement_And_Helper/blob/main/images/readme/texts-videoInfoFull-all_player_disabled.png?raw=true)

- Enabled: Customized to display the entire info with automatic spacing and line breaks based on length.
  - Home:
  
  ![texts-videoInfoFull-all_home_enabled](https://github.com/NekoZ410/Youtube_Enhancement_And_Helper/blob/main/images/readme/texts-videoInfoFull-all_home_enabled.png?raw=true)

  - Sidebar:

  ![texts-videoInfoFull-all_sidebar_enabled](https://github.com/NekoZ410/Youtube_Enhancement_And_Helper/blob/main/images/readme/texts-videoInfoFull-all_sidebar_enabled.png?raw=true)

  - Player:

  ![texts-videoInfoFull-all_player_enabled](https://github.com/NekoZ410/Youtube_Enhancement_And_Helper/blob/main/images/readme/texts-videoInfoFull-all_player_enabled.png?raw=true)

### 7. Display full playlist title (Home page)
- Disabled: Default only displays 2 lines and an ellipsis at the end when the name is too long.

![texts-plTitleFull-home_disabled](https://github.com/NekoZ410/Youtube_Enhancement_And_Helper/blob/main/images/readme/texts-plTitleFull-home_disabled.png?raw=true)

- Enabled: Customized to display the entire title with automatic spacing and line breaks based on length.

![texts-plTitleFull-home_enabled](https://github.com/NekoZ410/Youtube_Enhancement_And_Helper/blob/main/images/readme/texts-plTitleFull-home_enabled.png?raw=true)

### 8. Display full playlist info
- Disabled: Default only displays 1 line and an ellipsis at the end when the name is too long.
  - Home:

  ![texts-plInfoFull-all_home_disabled](https://github.com/NekoZ410/Youtube_Enhancement_And_Helper/blob/main/images/readme/texts-plInfoFull-all_home_disabled.png?raw=true)

  - Playlist panel (collapsed):

  ![texts-plInfoFull-all_plPanel_collapse_disabled](https://github.com/NekoZ410/Youtube_Enhancement_And_Helper/blob/main/images/readme/texts-plInfoFull-all_plPanel_collapse_disabled.png?raw=true)

  - Playlist panel (expanded):

  ![texts-plInfoFull-all_plPanel_expand_disabled](https://github.com/NekoZ410/Youtube_Enhancement_And_Helper/blob/main/images/readme/texts-plInfoFull-all_plPanel_expand_disabled.png?raw=true)

- Enabled: Customized to display the entire info with automatic spacing and line breaks based on length.
  - Home:
  
  ![texts-plInfoFull-all_home_enabled](https://github.com/NekoZ410/Youtube_Enhancement_And_Helper/blob/main/images/readme/texts-plInfoFull-all_home_enabled.png?raw=true)

  - Playlist panel (collapsed):

  ![texts-plInfoFull-all_plPanel_collapse_enabled](https://github.com/NekoZ410/Youtube_Enhancement_And_Helper/blob/main/images/readme/texts-plInfoFull-all_plPanel_collapse_enabled.png?raw=true)

  - Playlist panel (expanded):

  ![texts-plInfoFull-all_plPanel_expand_enabled](https://github.com/NekoZ410/Youtube_Enhancement_And_Helper/blob/main/images/readme/texts-plInfoFull-all_plPanel_expand_enabled.png?raw=true)


### 9. Display full shorts title
- Disabled: Default only displays 2 lines and an ellipsis at the end when the name is too long.

![player-shortsTitleFull-all_disabled](https://github.com/NekoZ410/Youtube_Enhancement_And_Helper/blob/main/images/readme/texts-shortsTitleFull-all_disabled.png?raw=true)

- Enabled: Customized to display the entire title with automatic spacing and line breaks based on length.

![player-shortsTitleFull-all_enabled](https://github.com/NekoZ410/Youtube_Enhancement_And_Helper/blob/main/images/readme/texts-shortsTitleFull-all_enabled.png?raw=true)

### 0. Display full channel info
> (under testing, temporary disabled)

### 0. Fix "Join" Membership button 
> (under testing, temporary disabled)

## Player Features
### 1. Custom controls bar background
- Disabled: Default with a white background with a faint gradient.

![player-controlsBgCustom_disabled](https://github.com/NekoZ410/Youtube_Enhancement_And_Helper/blob/main/images/readme/player-controlsBgCustom_disabled.png?raw=true)

- Enabled: Customized with a matte, nearly transparent gray background.

![player-controlsBgCustom_enabled](https://github.com/NekoZ410/Youtube_Enhancement_And_Helper/blob/main/images/readme/player-controlsBgCustom_enabled.png?raw=true)

### 2. Persistent progress bar
- Disabled: Default with nothing when control bar was hidden.

![player-persistentProgressBar_disabled](https://github.com/NekoZ410/Youtube_Enhancement_And_Helper/blob/main/images/readme/player-persistentProgressBar_disabled.png?raw=true)

- Enabled: Customized with persistent progress bar in YouTube's signature red color.

![player-persistentProgressBar_enabled](https://github.com/NekoZ410/Youtube_Enhancement_And_Helper/blob/main/images/readme/player-persistentProgressBar_enabled.png?raw=true)

## Utilities Features
### 1. Watch shorts in '/watch' view
- Disabled: Default with no functional button.

![utilities-shortsToWatch_disabled](https://github.com/NekoZ410/Youtube_Enhancement_And_Helper/blob/main/images/readme/utilities-shortsToWatch_disabled.png?raw=true)

- Enabled: Customized with a functional button that redirect to '/watch' view.

![utilities-shortsToWatch_enabled](https://github.com/NekoZ410/Youtube_Enhancement_And_Helper/blob/main/images/readme/utilities-shortsToWatch_enabled.png?raw=true)

### 2. Watch video without trapped into a playlist
- Disabled: Default with no functional button.
  - Normal playlist:

  ![utilities-noPlaylistTrap_pl_disabled](https://github.com/NekoZ410/Youtube_Enhancement_And_Helper/blob/main/images/readme/utilities-noPlaylistTrap_pl_disabled.png?raw=true)

  - Playlist trap video:

  ![utilities-noPlaylistTrap_pltrap_disabled](https://github.com/NekoZ410/Youtube_Enhancement_And_Helper/blob/main/images/readme/utilities-noPlaylistTrap_pltrap_disabled.png?raw=true)

- Enabled: Customized with a functional button that redirect to pure video URL.
  - Normal playlist:

  ![utilities-noPlaylistTrap_pl_enabled](https://github.com/NekoZ410/Youtube_Enhancement_And_Helper/blob/main/images/readme/utilities-noPlaylistTrap_pl_enabled.png?raw=true)
  
  - Playlist trap video:
  
  ![utilities-noPlaylistTrap_pltrap_enabled](https://github.com/NekoZ410/Youtube_Enhancement_And_Helper/blob/main/images/readme/utilities-noPlaylistTrap_pltrap_enabled.png?raw=true)

### 3. Improve channel redirection
- Disabled: Default with no URL preview and no redirection to channel profile.
  - Hovering on channel avatar (home page)

  ![utilities-channelRedirImprove_home_disabled](https://github.com/NekoZ410/Youtube_Enhancement_And_Helper/blob/main/images/readme/utilities-channelRedirImprove_home_disabled.png?raw=true)

  - Hovering on channel name (in sidebar)

  ![utilities-channelRedirImprove_plPanel_disabled](https://github.com/NekoZ410/Youtube_Enhancement_And_Helper/blob/main/images/readme/utilities-channelRedirImprove_plPanel_disabled.png?raw=true)

  - Hovering on channel name (in playlist panel)

  ![utilities-channelRedirImprove_sidebar_disabled](https://github.com/NekoZ410/Youtube_Enhancement_And_Helper/blob/main/images/readme/utilities-channelRedirImprove_sidebar_disabled.png?raw=true)

- Enabled: Customized with URL preview and redirection to channel profile.
  - Hovering on channel avatar (home page)

  ![utilities-channelRedirImprove_home_enabled](https://github.com/NekoZ410/Youtube_Enhancement_And_Helper/blob/main/images/readme/utilities-channelRedirImprove_home_enabled.png?raw=true)

  - Hovering on channel name (in playlist panel)

  ![utilities-channelRedirImprove_plPanel_enabled](https://github.com/NekoZ410/Youtube_Enhancement_And_Helper/blob/main/images/readme/utilities-channelRedirImprove_plPanel_enabled.png?raw=true)

  - Hovering on channel name (in sidebar)

  ![utilities-channelRedirImprove_sidebar_enabled](https://github.com/NekoZ410/Youtube_Enhancement_And_Helper/blob/main/images/readme/utilities-channelRedirImprove_sidebar_enabled.png?raw=true)

## Issues
If you encounter any bugs or have suggestions for new features, please submit an Issue.

[^1]: Because this extension only overrides YouTube's default interface, some upper rows may sometimes only display 3 videos or fewer. Other rows below are unaffected.
[^2]: Because YouTube's default interface only renders a maximum of 9 shorts per row, the recommended maximum number should be 9.