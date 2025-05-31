package health.app.tracker.controller;


import health.app.tracker.dto.MealLogRequest;
import health.app.tracker.entity.MealLog;
import health.app.tracker.service.MealService;
import health.app.tracker.utils.ApiResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/meals")
public class MealController {

    private final MealService mealService;

    public MealController(MealService mealService) {
        this.mealService = mealService;
    }

    @PostMapping("/log")
    public ResponseEntity<ApiResponse<MealLog>> logMeal(@RequestBody MealLogRequest request) {
        return ResponseEntity.ok(
                ApiResponse.success(mealService.logMeal(request), "Meal logged")
        );
    }

    @GetMapping("/today")
    public ResponseEntity<ApiResponse<List<MealLog>>> getTodayMeals(@RequestParam UUID userId) {
        return ResponseEntity.ok(
                ApiResponse.success(mealService.getMealLogs(userId), "Today's meals")
        );
    }

}
