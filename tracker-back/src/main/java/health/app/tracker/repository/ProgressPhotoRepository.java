package health.app.tracker.repository;

import health.app.tracker.entity.ProgressPhoto;
import health.app.tracker.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProgressPhotoRepository extends JpaRepository<ProgressPhoto, Long> {
    List<ProgressPhoto> findAllByUserOrderByDateDesc(User user);
}
