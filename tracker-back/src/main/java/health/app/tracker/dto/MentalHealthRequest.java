package health.app.tracker.dto;

import lombok.Data;

import java.util.List;
import java.util.Map;

@Data
public class MentalHealthRequest {
    private String mood;
    private Integer stress;
    private Integer focus;
    private Integer anxiety;
    private List<String> practices;
    private Map<String, String> journalEntries;
}

