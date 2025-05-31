package health.app.tracker.service;

import health.app.tracker.dto.SleepLogRequest;
import health.app.tracker.entity.SleepLog;
import health.app.tracker.entity.User;
import health.app.tracker.repository.SleepLogRepository;
import health.app.tracker.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.Optional;
import java.util.UUID;

@Service
public class SleepService {

    private final SleepLogRepository sleepLogRepository;
    private final UserRepository userRepository;

    public SleepService(SleepLogRepository sleepLogRepository, UserRepository userRepository) {
        this.sleepLogRepository = sleepLogRepository;
        this.userRepository = userRepository;
    }

    public SleepLog logSleep(SleepLogRequest request) {
        User user = userRepository.findById(request.getUserId())
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        LocalTime bedtime = LocalTime.parse(request.getBedtime());
        LocalTime wakeTime = LocalTime.parse(request.getWakeTime());

        double hours = Duration.between(bedtime, wakeTime).toMinutes() / 60.0;
        if (hours < 0) hours += 24; // handle overnight sleep

        SleepLog log = SleepLog.builder()
                .user(user)
                .date(LocalDate.now())
                .bedtime(request.getBedtime())
                .wakeTime(request.getWakeTime())
                .sleepDuration(hours)
                .mood(request.getMood())
                .energy(request.getEnergy())
                .focus(request.getFocus())
                .tags(request.getTags())
                .build();

        return sleepLogRepository.save(log);
    }

    public Optional<SleepLog> getTodaySleep(UUID userId) {
        return sleepLogRepository.findByUserIdAndDate(userId, LocalDate.now());
    }
}
