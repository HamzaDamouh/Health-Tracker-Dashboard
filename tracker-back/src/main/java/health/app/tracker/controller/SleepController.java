package health.app.tracker.controller;

import health.app.tracker.dto.SleepLogRequest;
import health.app.tracker.entity.SleepLog;
import health.app.tracker.service.SleepService;
import health.app.tracker.utils.ApiResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/sleep")
public class SleepController {

    private final SleepService sleepService;

    public SleepController(SleepService sleepService) {
        this.sleepService = sleepService;
    }

    @PostMapping("/log")
    public ResponseEntity<ApiResponse<SleepLog>> logSleep(@RequestBody SleepLogRequest request) {
        SleepLog savedLog = sleepService.logSleep(request);
        return ResponseEntity.ok(ApiResponse.success(savedLog, "Sleep data logged successfully"));
    }

    @GetMapping("/today")
    public ResponseEntity<ApiResponse<SleepLog>> getTodaySleep(@RequestParam UUID userId) {
        return sleepService.getTodaySleep(userId)
                .map(log -> ResponseEntity.ok(ApiResponse.success(log, "Today's sleep retrieved")))
                .orElse(ResponseEntity.ok(ApiResponse.success(null, "No sleep log for today")));
    }
}
