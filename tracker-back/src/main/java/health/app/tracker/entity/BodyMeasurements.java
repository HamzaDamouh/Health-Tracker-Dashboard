package health.app.tracker.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BodyMeasurements {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDate date;

    private Double chest;
    private Double neck;
    private Double arms;
    private Double waist;
    private Double thighs;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;
}

