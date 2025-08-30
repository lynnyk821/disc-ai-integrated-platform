package ua.todolist.server.app.backend.service.employee.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import ua.todolist.server.app.backend.api.employee.dto.EmployeeDTO;
import ua.todolist.server.app.backend.database.entity.EmployeeEntity;
import ua.todolist.server.app.backend.database.repository.EmployeeRepository;
import ua.todolist.server.app.backend.service.employee.EmployeeService;

import java.util.List;

@Service
@RequiredArgsConstructor
public class EmployeeServiceImpl implements EmployeeService {
    private final EmployeeRepository employeeRepository;

    @Override
    public List<EmployeeEntity> findEmployeesByIds(List<Long> ids) {
        return employeeRepository.findAllById(ids);
    }

    @Override
    public List<EmployeeDTO> findAllEmployees() {
        return this.employeeRepository.findAll().stream()
                .map(employeeEntity -> new EmployeeDTO(employeeEntity.getId(), employeeEntity.getName()))
                .toList();
    }
}
