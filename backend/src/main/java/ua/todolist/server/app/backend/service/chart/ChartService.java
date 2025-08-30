package ua.todolist.server.app.backend.service.chart;

import ua.todolist.server.app.backend.api.chart.dto.ChartEmployeeDataDTO;

import java.util.List;

public interface ChartService {
    List<ChartEmployeeDataDTO> getListOfEmployeeChartData();
}
