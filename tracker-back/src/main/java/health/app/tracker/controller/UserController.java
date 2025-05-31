package health.app.tracker.controller;


import health.app.tracker.entity.User;
import health.app.tracker.service.UserService;
import health.app.tracker.utils.ApiResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/create")
    public ResponseEntity<ApiResponse<User>> createUser(@RequestBody User user) {
        return ResponseEntity.ok(ApiResponse.success(userService.createUser(user), "User created"));
    }

    @GetMapping("/{id}")
   public ResponseEntity<ApiResponse<User>> getUser(@PathVariable UUID id) {
        return userService.getById(id)
                .map(user -> ResponseEntity.ok(ApiResponse.success(user, "User found")))
                .orElse(ResponseEntity.notFound().build());
    }


}
