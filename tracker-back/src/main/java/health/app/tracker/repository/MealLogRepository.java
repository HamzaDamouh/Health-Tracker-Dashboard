package health.app.tracker.repository;

import health.app.tracker.entity.MealLog;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Date;
import java.util.List;
import java.util.UUID;

public interface MealLogRepository extends JpaRepository<MealLog, Long> {
    List<MealLog> findByUserIdAndDate(UUID userId, Date date);
}
