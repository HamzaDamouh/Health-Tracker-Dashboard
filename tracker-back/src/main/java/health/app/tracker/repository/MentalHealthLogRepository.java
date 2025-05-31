package health.app.tracker.repository;

import health.app.tracker.entity.MentalHealthLog;
import health.app.tracker.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface MentalHealthLogRepository extends JpaRepository<MentalHealthLog, Long> {
    Optional<MentalHealthLog> findByUserAndDate(User user, LocalDate date);
    List<MentalHealthLog> findAllByUserAndDateBetween(User user, LocalDate start, LocalDate end);
}
