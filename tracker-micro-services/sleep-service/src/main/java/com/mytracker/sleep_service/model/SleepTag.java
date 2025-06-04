package com.mytracker.sleep_service.model;

public enum SleepTag {

    SLEPT_WELL("Slept Well"),
    BAD_DREAMS("Bad Dreams"),
    RESTLESS("Restless"),
    DEEP_SLEEP("Deep Sleep"),
    WAKE_UP_EARLY("Wake up early"),
    HARD_TO_FALL_ASLEEP("Hard to fall asleep");

    private final String displayName;

    SleepTag(String displayName) {
        this.displayName = displayName;
    }

    public String getDisplayName() {
        return displayName;
    }

}
