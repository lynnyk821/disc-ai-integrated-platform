package ua.todolist.server.app.backend.service.chart.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import ua.todolist.server.app.backend.api.chart.dto.ChartEmployeeDataDTO;
import ua.todolist.server.app.backend.database.entity.EmployeeChartDataEntity;
import ua.todolist.server.app.backend.database.repository.EmployeeChartDataRepository;
import ua.todolist.server.app.backend.service.chart.ChartService;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ChartServiceImpl implements ChartService {
    private final EmployeeChartDataRepository employeeChartDataRepository;

    @Override
    public List<ChartEmployeeDataDTO> getListOfEmployeeChartData() {
        List<EmployeeChartDataEntity> employeeChartDataEntities = this.employeeChartDataRepository.findAll();
        return employeeChartDataEntities.stream()
                .map(employeeChartDataEntity -> ChartEmployeeDataDTO.builder()
                        .name(employeeChartDataEntity.getName())
                        .initials(employeeChartDataEntity.getInitials())
                        .yScore(employeeChartDataEntity.getYScore())
                        .xScore(employeeChartDataEntity.getXScore())
                        .build())
                .toList();
    }
}
