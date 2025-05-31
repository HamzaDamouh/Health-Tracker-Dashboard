package health.app.tracker.repository;

import health.app.tracker.entity.BodyMetrics;
import health.app.tracker.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface BodyMetricsRepository extends JpaRepository<BodyMetrics, Long> {
    Optional<BodyMetrics> findByDateAndUser(LocalDate date, User user);
    List<BodyMetrics> findAllByUserOrderByDateDesc(User user);
}

