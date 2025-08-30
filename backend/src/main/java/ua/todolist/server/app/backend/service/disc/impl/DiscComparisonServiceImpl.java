package ua.todolist.server.app.backend.service.disc.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import ua.todolist.server.app.backend.api.compare.dto.EmployeesComparisonResultDTO;
import ua.todolist.server.app.backend.database.entity.EmployeeEntity;
import ua.todolist.server.app.backend.service.disc.DiscCalculatorService;
import ua.todolist.server.app.backend.service.disc.DiscComparisonService;

import java.util.Comparator;
import java.util.List;
import java.util.function.Function;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class DiscComparisonServiceImpl implements DiscComparisonService {
    private final DiscCalculatorService discCalculatorService;

    @Override
    public List<EmployeesComparisonResultDTO.DiscComparison> getDiscComparison(List<EmployeeEntity> employees) {
        return List.of(
            createDiscComparison("Dominance", employees, discCalculatorService::calculateDominanceScore),
            createDiscComparison("Influence", employees, discCalculatorService::calculateInfluenceScore),
            createDiscComparison("Steadiness", employees, discCalculatorService::calculateSteadinessScore),
            createDiscComparison("Conscientiousness", employees, discCalculatorService::calculateConscientiousnessScore)
        );
    }

    private EmployeesComparisonResultDTO.DiscComparison createDiscComparison(String sector,
                                                                             List<EmployeeEntity> employees,
                                                                             Function<EmployeeEntity, Integer> scoreCalculator) {
        EmployeesComparisonResultDTO.DiscComparison comparison = new EmployeesComparisonResultDTO.DiscComparison();
        comparison.setSector(sector);

        // Розрахунок балів для всіх співробітників
        List<EmployeesComparisonResultDTO.DiscComparison.Employee> discEmployees = employees.stream()
                .map(emp -> {
                    EmployeesComparisonResultDTO.DiscComparison.Employee employee = new EmployeesComparisonResultDTO.DiscComparison.Employee();
                    employee.setName(emp.getName());
                    employee.setScore(scoreCalculator.apply(emp));
                    return employee;
                })
                .collect(Collectors.toList());

        comparison.setEmployees(discEmployees);

        // Знаходження найвищого та найнижчого балів
        EmployeesComparisonResultDTO.DiscComparison.Employee highest = discEmployees.stream()
                .max(Comparator.comparingInt(EmployeesComparisonResultDTO.DiscComparison.Employee::getScore))
                .orElse(null);

        EmployeesComparisonResultDTO.DiscComparison.Employee lowest = discEmployees.stream()
                .min(Comparator.comparingInt(EmployeesComparisonResultDTO.DiscComparison.Employee::getScore))
                .orElse(null);

        comparison.setHighestEmployee(highest);
        comparison.setLowestEmployee(lowest);

        // Розрахунок середнього балу
        double average = discEmployees.stream()
                .mapToInt(EmployeesComparisonResultDTO.DiscComparison.Employee::getScore)
                .average()
                .orElse(0.0);
        comparison.setAverageScore(Math.round(average * 10.0) / 10.0);

        // Розрахунок діапазону
        if (highest != null) {
            comparison.setRangeScore((double) (highest.getScore() - lowest.getScore()));
        }

        return comparison;
    }
}
