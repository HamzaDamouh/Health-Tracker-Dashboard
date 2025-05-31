package health.app.tracker.service;


import health.app.tracker.dto.MealLogRequest;
import health.app.tracker.entity.MealLog;
import health.app.tracker.entity.User;
import health.app.tracker.repository.MealLogRepository;
import health.app.tracker.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

@Service
public class MealService {

    private final MealLogRepository mealLogRepository;
    private final UserRepository userRepository;

    public MealService(MealLogRepository mealLogRepository, UserRepository userRepository) {
        this.mealLogRepository = mealLogRepository;
        this.userRepository = userRepository;
    }

    public MealLog logMeal(MealLogRequest request){
        User user = userRepository.findById(request.getUserId());
        MealLog log = MealLog.builder()
                .user(user)
                .date(LocalDate.now())
                .mealType(request.getMealType())
                .completed(request.getCompleted())
                .photoUrl(request.getPhotoUrl())
                .build();
        return mealLogRepository.save(log);
    }


    public List<MealLog> getMealLogs(UUID userId){
        return mealLogRepository.findByUserIdAndDate(userId, LocalDate.now());
    }

}
