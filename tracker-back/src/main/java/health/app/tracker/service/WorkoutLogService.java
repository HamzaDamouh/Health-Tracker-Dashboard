package health.app.tracker.service;


import health.app.tracker.dto.WorkoutLogRequest;
import health.app.tracker.entity.Exercise;
import health.app.tracker.entity.User;
import health.app.tracker.entity.WorkoutLog;
import health.app.tracker.repository.UserRepository;
import health.app.tracker.repository.WorkoutLogRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class WorkoutLogService {

    private final WorkoutLogRepository workoutLogRepository;
    private final UserRepository userRepository;

    public WorkoutLog logWorkout(String username, WorkoutLogRequest request) {
        User user = userRepository.findByUsername(username).orElseThrow(() -> new RuntimeException("User not found"));


        List<Exercise> exercises = request.getExercies().stream()
                .map(dto -> Exercise.builder()
                        .name(dto.getName())
                        .sets(dto.getSets())
                        .reps(dto.getReps())
                        .weight(dto.getWeight())
                        .build())
                .collect(Collectors.toList());

        WorkoutLog log = WorkoutLog.builder()
                .date(LocalDate.now())
                .workoutType(request.getWorkoutType())
                .completed(request.getCompleted())
                .exercises(exercises)
                .notes(request.getNotes())
                .user(user)
                .build();

        return workoutLogRepository.save(log);
    }

    public Optional<WorkoutLog> getTodayWorkout(String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return workoutLogRepository.findByDateAndUser(LocalDate.now(), user);
    }
}
