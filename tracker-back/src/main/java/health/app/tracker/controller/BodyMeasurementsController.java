package health.app.tracker.controller;


import health.app.tracker.dto.BodyMeasurementsRequest;
import health.app.tracker.entity.BodyMeasurements;
import health.app.tracker.service.BodyMeasurementsService;
import health.app.tracker.utils.ApiResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/body/measurements")
@RequiredArgsConstructor
public class BodyMeasurementsController {

    private final BodyMeasurementsService service;

    @PostMapping
    public ResponseEntity<ApiResponse<BodyMeasurements>> log(@RequestBody BodyMeasurementsRequest request) {
        BodyMeasurements logged = service.logMeasurements("default_user", request);
        return ResponseEntity.ok(ApiResponse.success(logged, "Measurements saved"));
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<BodyMeasurements>>> getAll() {
        List<BodyMeasurements> list = service.getHistory("default_user");
        return ResponseEntity.ok(ApiResponse.success(list, "All measurements fetched"));
    }
}

