package health.app.tracker.repository;

import health.app.tracker.entity.SleepLog;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface SleepLogRepository extends JpaRepository<SleepLog, Long> {

    Optional<SleepLog> findByUserIdAndDate(Long userId, LocalDate date);
    //for weekly views:
    List<SleepLog> findByUserIdAndDateBetween(Long userId, LocalDate start, LocalDate end);
}