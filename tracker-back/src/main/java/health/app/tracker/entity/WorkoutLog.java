package health.app.tracker.entity;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;


@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class WorkoutLog {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private LocalDate date;
    private WorkoutType workoutType;
    private Boolean completed;

    @ElementCollection
    @CollectionTable(name = "workout_exercise", joinColumns = @JoinColumn(name = "workout_log_id"))
    private List<Exercise> exercises = new ArrayList<>();

    @Column(columnDefinition = "TEXT")
    private String notes;


    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;



}
