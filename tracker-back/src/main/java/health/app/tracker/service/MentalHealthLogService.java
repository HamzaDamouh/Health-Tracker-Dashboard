package health.app.tracker.service;

import health.app.tracker.dto.MentalHealthRequest;
import health.app.tracker.entity.MentalHealthLog;
import health.app.tracker.entity.User;
import health.app.tracker.repository.MentalHealthLogRepository;
import health.app.tracker.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
public class MentalHealthLogService {

    private final MentalHealthLogRepository repo;
    private final UserRepository userRepository;

    public MentalHealthLog logToday(String username, MentalHealthRequest request) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        MentalHealthLog log = MentalHealthLog.builder()
                .date(LocalDate.now())
                .mood(request.getMood())
                .stress(request.getStress())
                .focus(request.getFocus())
                .anxiety(request.getAnxiety())
                .practices(request.getPractices())
                .journalEntries(request.getJournalEntries())
                .user(user)
                .build();

        return repo.save(log);
    }

    public MentalHealthLog getToday(String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return repo.findByUserAndDate(user, LocalDate.now())
                .orElse(null);
    }

    public List<MentalHealthLog> getLast7Days(String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        LocalDate end = LocalDate.now();
        LocalDate start = end.minusDays(6);
        return repo.findAllByUserAndDateBetween(user, start, end);
    }
}
