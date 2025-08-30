package ua.todolist.server.app.backend.service.employee;

import ua.todolist.server.app.backend.api.employee.dto.EmployeeDTO;
import ua.todolist.server.app.backend.database.entity.EmployeeEntity;

import java.util.List;

public interface EmployeeService {
    List<EmployeeEntity> findEmployeesByIds(List<Long> ids);
    List<EmployeeDTO> findAllEmployees();
}
