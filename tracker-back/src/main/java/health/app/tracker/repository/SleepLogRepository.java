package health.app.tracker.repository;

import health.app.tracker.entity.SleepLog;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface SleepLogRepository extends JpaRepository<SleepLog, Long> {

    List<SleepLog> findByUserIdAndDateBetween(UUID userId, LocalDate startDate, LocalDate endDate);

}