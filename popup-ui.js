document.addEventListener("DOMContentLoaded", () => {
    // ui: initialize settings
    initPopupSettings(UI_DEFAULT_SETTINGS);

    // ui: reset buttons
    const attachResetListener = (id) => {
        const resetButton = document.getElementById(`${id}-reset`);
        if (resetButton) {
            resetButton.addEventListener("click", () => {
                const defaultToggle = UI_DEFAULT_SETTINGS[`${id}-toggle`];
                const defaultValue = UI_DEFAULT_SETTINGS[id];

                // update storage
                chrome.storage.local.set(
                    {
                        [`${id}-toggle`]: defaultToggle,
                        [id]: defaultValue,
                    },
                    () => {
                        // update UI manually
                        const enabledCheckbox = document.getElementById(`${id}-toggle`);
                        const inputElement = document.getElementById(id);

                        if (enabledCheckbox) enabledCheckbox.checked = defaultToggle;
                        if (inputElement) {
                            inputElement.value = defaultValue;
                            inputElement.disabled = !defaultToggle;
                        }

                        // send update
                        sendUpdateStylesMessage(id);
                    }
                );
            });
        }
    };

    attachResetListener("ui-videosPerRow-home");
    attachResetListener("ui-shortsPerRow-home");
    attachResetListener("ui-postsPerRow-home");
    attachResetListener("ui-newsPerRow-home");
});
