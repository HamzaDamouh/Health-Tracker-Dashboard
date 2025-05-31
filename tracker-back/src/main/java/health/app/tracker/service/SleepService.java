package health.app.tracker.service;

import health.app.tracker.dto.SleepLogRequest;
import health.app.tracker.entity.SleepLog;
import health.app.tracker.repository.SleepLogRepository;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.time.LocalDate;
import java.time.LocalTime;

@Service
public class SleepService {

    private final SleepLogRepository repository;

    // For now, we assume userId = 1 (single user)
    private static final Long DEFAULT_USER_ID = 1L;

    public SleepService(SleepLogRepository repository) {
        this.repository = repository;
    }

    public SleepLog logSleep(SleepLogRequest req) {
        LocalDate today = LocalDate.now();

        repository.findByUserIdAndDate(DEFAULT_USER_ID, today)
                .ifPresent(log -> {
                    throw new IllegalStateException("Sleep already logged for today.");
                });

        double duration = calculateSleepDuration(req.getBedtime(), req.getWakeTime());

        SleepLog log = SleepLog.builder()
                .userId(DEFAULT_USER_ID)
                .date(today)
                .bedtime(req.getBedtime())
                .wakeTime(req.getWakeTime())
                .sleepDuration(duration)
                .mood(req.getMood())
                .energy(req.getEnergy())
                .focus(req.getFocus())
                .tags(req.getTags())
                .build();

        return repository.save(log);
    }

    public SleepLog getTodaySleep() {
        return repository.findByUserIdAndDate(DEFAULT_USER_ID, LocalDate.now())
                .orElse(null);
    }

    private double calculateSleepDuration(String bedtime, String wakeTime) {
        LocalTime bed = LocalTime.parse(bedtime);
        LocalTime wake = LocalTime.parse(wakeTime);

        Duration duration;
        if (wake.isBefore(bed)) {
            duration = Duration.between(bed, wake.plusHours(24));
        } else {
            duration = Duration.between(bed, wake);
        }

        return duration.toMinutes() / 60.0;
    }
}
