package health.app.tracker.repository;


import health.app.tracker.entity.BodyMeasurements;
import health.app.tracker.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;


@Repository
public interface BodyMeasurementsRepository extends JpaRepository<BodyMeasurements, Long> {
    List<BodyMeasurements> findAllByUserOrderByDateDesc(User user);
}
