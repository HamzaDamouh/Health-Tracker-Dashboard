package health.app.tracker.dto;


import lombok.Data;

import java.util.List;

@Data
public class SleepLogRequest {

    private String bedtime;
    private String wakeTime;
    private String mood;          // emoji
    private Integer energy;       // scale 1–10
    private Integer focus;        // scale 1–10
    private List<String> tags;
}
