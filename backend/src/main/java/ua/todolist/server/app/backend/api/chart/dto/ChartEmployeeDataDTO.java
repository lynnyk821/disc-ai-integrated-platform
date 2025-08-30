package ua.todolist.server.app.backend.api.chart.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Builder
@Getter @Setter
public class ChartEmployeeDataDTO {
    private String name;
    private String initials;
    private double xScore;
    private double yScore;
}
