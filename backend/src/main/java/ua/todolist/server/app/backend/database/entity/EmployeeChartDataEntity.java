package ua.todolist.server.app.backend.database.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "employee_chart_data")
@Getter @Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class EmployeeChartDataEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String initials;

    @Column(name = "x_score", nullable = false)
    private Double xScore;

    @Column(name = "y_score", nullable = false)
    private Double yScore;
}
