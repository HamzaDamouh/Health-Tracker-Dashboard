package health.app.tracker.service;

import health.app.tracker.dto.BodyMetricsRequest;
import health.app.tracker.entity.BodyMetrics;
import health.app.tracker.entity.User;
import health.app.tracker.repository.BodyMetricsRepository;
import health.app.tracker.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;

@Service
@RequiredArgsConstructor
public class BodyMetricsService {

    private final BodyMetricsRepository bodyMetricsRepository;
    private final UserRepository userRepository;

    public BodyMetrics logDailyMetrics(String username, BodyMetricsRequest request) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        BodyMetrics metrics = bodyMetricsRepository.findByDateAndUser(LocalDate.now(), user)
                .orElse(BodyMetrics.builder().date(LocalDate.now()).user(user).build());

        metrics.setWeight(request.getWeight());
        metrics.setWaterIntake(request.getWaterIntake());
        metrics.setSteps(request.getSteps());

        return bodyMetricsRepository.save(metrics);
    }

    public BodyMetrics getTodayMetrics(String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return bodyMetricsRepository.findByDateAndUser(LocalDate.now(), user)
                .orElse(null);
    }
}

