package health.app.tracker.repository;

import health.app.tracker.entity.User;
import health.app.tracker.entity.WorkoutLog;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.Optional;

public interface WorkoutLogRepository extends JpaRepository<WorkoutLog, Long> {
    Optional<WorkoutLog> findByDateAndUser(LocalDate date, User user);
}
