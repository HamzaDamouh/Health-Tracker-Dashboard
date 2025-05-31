package health.app.tracker.service;

import health.app.tracker.dto.BodyMeasurementsRequest;
import health.app.tracker.entity.BodyMeasurements;
import health.app.tracker.entity.User;
import health.app.tracker.repository.BodyMeasurementsRepository;
import health.app.tracker.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
public class BodyMeasurementsService {

    private final BodyMeasurementsRepository repo;
    private final UserRepository userRepository;

    public BodyMeasurements logMeasurements(String username, BodyMeasurementsRequest request) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        BodyMeasurements measurement = BodyMeasurements.builder()
                .date(LocalDate.now())
                .chest(request.getChest())
                .neck(request.getNeck())
                .arms(request.getArms())
                .waist(request.getWaist())
                .thighs(request.getThighs())
                .user(user)
                .build();

        return repo.save(measurement);
    }

    public List<BodyMeasurements> getHistory(String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return repo.findAllByUserOrderByDateDesc(user);
    }
}

