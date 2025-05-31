package health.app.tracker.service;


import health.app.tracker.entity.User;
import health.app.tracker.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.UUID;

@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public User createUser(User user){
        return userRepository.save(user);
    }

    public Optional<User> getById(UUID id){
        return Optional.ofNullable(userRepository.findById(id));
    }

    public Optional<User> getByEmail(String email) {
        return userRepository.findByEmail(email);
    }


}
