package health.app.tracker.controller;

import health.app.tracker.dto.SleepLogRequest;
import health.app.tracker.entity.SleepLog;
import health.app.tracker.service.SleepService;
import health.app.tracker.utils.ApiResponse;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
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

    @GetMapping("/users/{userId}/sleep-logs")
    public ResponseEntity<List<SleepLog>> getUserSleepLogs(
            @PathVariable String userId,
            @RequestParam("from") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate from,
            @RequestParam("to") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate to) {

        UUID uuid = UUID.fromString(userId);
        return ResponseEntity.ok(sleepService.getUserSleepLogs(uuid, from, to));
    }

}
