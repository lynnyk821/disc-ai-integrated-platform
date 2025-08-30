package ua.todolist.server.app.backend.api.employee;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ua.todolist.server.app.backend.api.employee.dto.EmployeeDTO;
import ua.todolist.server.app.backend.service.employee.EmployeeService;

import java.util.List;

@RestController
@RequestMapping("/employees")
@RequiredArgsConstructor
public class EmployeeController {
    private final EmployeeService employeeService;

    @GetMapping
    public ResponseEntity<List<EmployeeDTO>> getAllEmployees() {
        List<EmployeeDTO> employees = this.employeeService.findAllEmployees();
        return ResponseEntity.ok().body(employees);
    }
}
