package ua.todolist.server.app.backend.service.disc;

import ua.todolist.server.app.backend.api.compare.dto.EmployeesComparisonResultDTO;
import ua.todolist.server.app.backend.database.entity.EmployeeEntity;

import java.util.List;

public interface DiscComparisonService {
    List<EmployeesComparisonResultDTO.DiscComparison> getDiscComparison(List<EmployeeEntity> employees);
}
