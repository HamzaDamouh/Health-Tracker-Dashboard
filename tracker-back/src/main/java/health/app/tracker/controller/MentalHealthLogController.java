package health.app.tracker.controller;

import health.app.tracker.dto.MentalHealthRequest;
import health.app.tracker.entity.MentalHealthLog;
import health.app.tracker.service.MentalHealthLogService;
import health.app.tracker.utils.ApiResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/mental")
@RequiredArgsConstructor
public class MentalHealthLogController {

    private final MentalHealthLogService service;

    @PostMapping("/checkin")
    public ResponseEntity<ApiResponse<MentalHealthLog>> logToday(@RequestBody MentalHealthRequest request) {
        MentalHealthLog log = service.logToday("hamza", request);
        return ResponseEntity.ok(ApiResponse.success(log, "Mental health check-in logged successfully"));
    }

    @GetMapping("/today")
    public ResponseEntity<ApiResponse<MentalHealthLog>> getToday() {
        MentalHealthLog today = service.getToday("hamza");
        return ResponseEntity.ok(ApiResponse.success(today, "Today's mental data"));
    }

    @GetMapping("/week")
    public ResponseEntity<ApiResponse<List<MentalHealthLog>>> getWeek() {
        List<MentalHealthLog> logs = service.getLast7Days("hamza");
        return ResponseEntity.ok(ApiResponse.success(logs, "Week of mental health logs"));
    }
}
