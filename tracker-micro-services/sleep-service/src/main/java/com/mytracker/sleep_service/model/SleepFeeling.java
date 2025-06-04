package com.mytracker.sleep_service.model;


import java.util.Collection;

public enum SleepFeeling {
    SLEEPY("Sleepy"),
    NEUTRAL("Neutral"),
    TIRED("Tired"),
    GOOD("Good"),
    ENERGIZED("Energized");


    private final String displayName;

    SleepFeeling(String displayName) {
        this.displayName = displayName;
    }

    public String getDisplayName() {
        return displayName;
    }
}
