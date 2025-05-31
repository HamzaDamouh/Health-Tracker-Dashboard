package health.app.tracker.entity;

import com.vladmihalcea.hibernate.type.json.JsonBinaryType;
import jakarta.persistence.*;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.Type;


import java.time.LocalDate;
import java.util.List;
import java.util.Map;

@Entity
@Table(name = "mental_health_log")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MentalHealthLog {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDate date;

    private String mood;
    private Integer stress;
    private Integer focus;
    private Integer anxiety;

    @ElementCollection
    private List<String> practices;

    @Type(value = JsonBinaryType.class)
    @Column(columnDefinition = "jsonb")
    private Map<String, String> journalEntries;



    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;
}
