package ua.todolist.server.app.backend.service.compare;

import ua.todolist.server.app.backend.api.compare.dto.EmployeesComparisonResultDTO;

import java.util.List;

public interface CompareEmployeesService {
    EmployeesComparisonResultDTO compareEmployees(List<Long> employeeIds);
}
