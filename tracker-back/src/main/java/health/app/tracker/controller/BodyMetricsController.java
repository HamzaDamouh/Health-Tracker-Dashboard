package health.app.tracker.controller;

import health.app.tracker.dto.BodyMetricsRequest;
import health.app.tracker.entity.BodyMetrics;
import health.app.tracker.service.BodyMetricsService;
import health.app.tracker.utils.ApiResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/body")
@RequiredArgsConstructor
public class BodyMetricsController {

    private final BodyMetricsService bodyMetricsService;

    @PostMapping("/daily")
    public ResponseEntity<ApiResponse<BodyMetrics>> logDailyMetrics(@RequestBody BodyMetricsRequest request) {
        BodyMetrics metrics = bodyMetricsService.logDailyMetrics("hamza", request);
        return ResponseEntity.ok(ApiResponse.success(metrics, "Daily metrics logged"));
    }

    @GetMapping("/today")
    public ResponseEntity<ApiResponse<BodyMetrics>> getTodayMetrics() {
        BodyMetrics metrics = bodyMetricsService.getTodayMetrics("hamza");
        return ResponseEntity.ok(ApiResponse.success(metrics, "Today's body metrics retrieved"));
    }
}

