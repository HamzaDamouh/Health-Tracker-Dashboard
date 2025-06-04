package com.mytracker.sleep_service.model;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.Set;

@Entity
@Table(name = "sleep_entry")
@Data
public class SleepEntry {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "entry_date", nullable = false)
    private LocalDate entryDate;

    @Column(nullable = false)
    private LocalTime bedtime;

    @Column(name = "wake_time", nullable = false)
    private LocalTime wakeTime;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private SleepFeeling feeling;


    @Column(name = "energy_level", nullable = false)
    private Integer energyLevel;  // 1-10

    @Column(name = "focus_level", nullable = false)
    private Integer focusLevel;   // 1-10

    // ElementCollection for tags (creates a join table named sleep_entry_tags automatically)
    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(
            name = "sleep_entry_tags",
            joinColumns = @JoinColumn(name = "sleep_entry_id")
    )
    @Enumerated(EnumType.STRING)
    @Column(name = "tag", length = 30)
    private Set<SleepTag> tags;



    public SleepEntry() {
    }

    public SleepEntry(LocalDate entryDate, LocalTime bedtime, LocalTime wakeTime,
                      SleepFeeling feeling, Integer energyLevel, Integer focusLevel, Set<SleepTag> tags) {
        this.entryDate = entryDate;
        this.bedtime = bedtime;
        this.wakeTime = wakeTime;
        this.feeling = feeling;
        this.energyLevel = energyLevel;
        this.focusLevel = focusLevel;
        this.tags = tags;
    }
}