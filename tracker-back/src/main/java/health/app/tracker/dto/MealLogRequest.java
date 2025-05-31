package health.app.tracker.dto;


import health.app.tracker.entity.MealType;
import lombok.Data;

import java.util.UUID;

@Data
public class MealLogRequest {
    private MealType mealType;
    private Boolean completed;
    private String photoUrl;
    private UUID userId;
}
