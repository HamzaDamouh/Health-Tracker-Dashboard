package health.app.tracker.dto;

import health.app.tracker.entity.Exercise;
import health.app.tracker.entity.WorkoutType;
import lombok.Data;

import java.util.List;

@Data
public class WorkoutLogRequest {
    private WorkoutType workoutType;
    private Boolean completed;
    private List<ExerciseDto> exercies;
    private String notes;
}
