package health.app.tracker.service;

import health.app.tracker.entity.ProgressPhoto;
import health.app.tracker.entity.User;
import health.app.tracker.repository.ProgressPhotoRepository;
import health.app.tracker.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ProgressPhotoService {

    private final ProgressPhotoRepository repo;
    private final UserRepository userRepository;

    public ProgressPhoto uploadPhoto(String username, String type, String url) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        ProgressPhoto photo = ProgressPhoto.builder()
                .date(LocalDate.now())
                .type(type)
                .photoUrl(url)
                .user(user)
                .build();

        return repo.save(photo);
    }

    public List<ProgressPhoto> getAllPhotos(String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return repo.findAllByUserOrderByDateDesc(user);
    }
}

