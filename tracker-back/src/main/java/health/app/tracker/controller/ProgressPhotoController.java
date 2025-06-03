package health.app.tracker.controller;

import health.app.tracker.entity.ProgressPhoto;
import health.app.tracker.service.ProgressPhotoService;
import health.app.tracker.utils.ApiResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/body/photos")
@RequiredArgsConstructor
public class ProgressPhotoController {

    private final ProgressPhotoService service;

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<ApiResponse<ProgressPhoto>> uploadPhoto(
            @RequestParam("type") String type,
            @RequestParam("file") MultipartFile file) {


        String fileUrl = "/uploads/" + file.getOriginalFilename();

        ProgressPhoto photo = service.uploadPhoto("hamza", type, fileUrl);
        return ResponseEntity.ok(ApiResponse.success(photo, "Progress photo uploaded"));
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<ProgressPhoto>>> getAll() {
        List<ProgressPhoto> photos = service.getAllPhotos("hamza");
        return ResponseEntity.ok(ApiResponse.success(photos, "All progress photos"));
    }
}
