package health.app.tracker.controller;

import health.app.tracker.dto.SleepLogRequest;
import health.app.tracker.entity.SleepLog;
import health.app.tracker.service.SleepService;
import health.app.tracker.utils.ApiResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/sleep")
@CrossOrigin(origins = "http://localhost:3000") // Or use "*" during dev
public class SleepController {

    private final SleepService sleepService;

    public SleepController(SleepService sleepService) {
        this.sleepService = sleepService;
    }

    @PostMapping("/log")
    public ResponseEntity<ApiResponse<SleepLog>> logSleep(@RequestBody SleepLogRequest request) {
        SleepLog saved = sleepService.logSleep(request);
        return ResponseEntity.ok(ApiResponse.success(saved, "Sleep data logged successfully"));
    }

    @GetMapping("/today")
    public ResponseEntity<ApiResponse<SleepLog>> getTodaySleep() {
        SleepLog sleep = sleepService.getTodaySleep();
        return ResponseEntity.ok(ApiResponse.success(sleep, "Today's sleep data retrieved"));
    }
}
