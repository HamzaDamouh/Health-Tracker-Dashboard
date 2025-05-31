package health.app.tracker.dto;


import lombok.Data;

@Data
public class MealLogRequest {
    private String mealType;
    private Boolean completed;
    private String photoUrl;
}
