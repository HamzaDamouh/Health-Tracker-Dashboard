package health.app.tracker.entity;


import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.util.List;

@Entity
@Table(name = "sleep_logs", uniqueConstraints = @UniqueConstraint(columnNames = {"user_id", "date"}))
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SleepLog {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @Column(name = "user_id", nullable = false)
    private Long userId;

    @Column(nullable = false)
    private LocalDate date;

    @Column(nullable = false)
    private String bedtime;

    @Column(nullable = false)
    private String wakeTime;

    @Column(name = "sleep_duration")
    private Double sleepDuration;

    private String mood;

    private Integer energy;
    private Integer focus;

    @ElementCollection
    @CollectionTable(name = "sleep_tags", joinColumns = @JoinColumn(name = "sleep_log_id"))
    @Column(name = "tag")
    private List<String> tags;
}
