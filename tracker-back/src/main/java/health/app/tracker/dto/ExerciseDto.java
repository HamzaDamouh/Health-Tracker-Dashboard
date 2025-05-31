package health.app.tracker.dto;

import lombok.Data;

@Data
public class ExerciseDto {
    private String name;
    private Integer sets;
    private Integer reps;
    private Double weight;
}
