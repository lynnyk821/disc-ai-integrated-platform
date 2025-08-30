package ua.todolist.server.app.backend.service.compare.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ua.todolist.server.app.backend.api.employee.dto.EmployeeDTO;
import ua.todolist.server.app.backend.api.compare.dto.EmployeesComparisonResultDTO;
import ua.todolist.server.app.backend.database.entity.EmployeeEntity;
import ua.todolist.server.app.backend.service.compare.CompareEmployeesService;
import ua.todolist.server.app.backend.service.compare.ProfileAnalysisService;
import ua.todolist.server.app.backend.service.compare.SimilarityAnalysisService;
import ua.todolist.server.app.backend.service.disc.DiscComparisonService;
import ua.todolist.server.app.backend.service.employee.EmployeeService;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CompareEmployeesServiceImpl implements CompareEmployeesService {
    private final EmployeeService employeeService;
    private final DiscComparisonService discComparisonService;
    private final ProfileAnalysisService profileAnalysisService;
    private final SimilarityAnalysisService similarityAnalysisService;

    @Override
    @Transactional
    public EmployeesComparisonResultDTO compareEmployees(List<Long> employeeIds) {
        List<EmployeeEntity> employees = this.employeeService.findEmployeesByIds(employeeIds);

        return EmployeesComparisonResultDTO.builder()
                .employees(employees.stream()
                        .map(employee -> new EmployeeDTO(employee.getId(), employee.getName())).toList())
                .similarities(this.similarityAnalysisService.calculateSimilarity(employees))
                .detailedDiscComparison(this.discComparisonService.getDiscComparison(employees))
                .individualEmployeeProfiles(this.profileAnalysisService.getIndividualEmployeeProfiles(employees))
        .build();
    }
}
