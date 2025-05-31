package health.app.tracker.dto;

import lombok.Data;

@Data
public class BodyMeasurementsRequest {
    private Double chest;
    private Double neck;
    private Double arms;
    private Double waist;
    private Double thighs;
}
