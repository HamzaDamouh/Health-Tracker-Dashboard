package health.app.tracker.dto;

import lombok.Data;

@Data
public class BodyMetricsRequest {
    private Double weight;
    private Double waterIntake;
    private Integer steps;
}
