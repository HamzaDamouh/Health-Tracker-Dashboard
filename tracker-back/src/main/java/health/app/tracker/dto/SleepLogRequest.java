package health.app.tracker.dto;


import lombok.Data;

import java.util.List;
import java.util.UUID;

@Data
public class SleepLogRequest {
    private UUID userId;
    private String bedtime;
    private String wakeTime;
    private String mood;          // emoji
    private Integer energy;       // scale 1–10
    private Integer focus;        // scale 1–10
    private List<String> tags;
}
