package ua.todolist.server.app.backend.api.employee;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ua.todolist.server.app.backend.api.employee.dto.EmployeeDTO;
import ua.todolist.server.app.backend.service.employee.EmployeeService;

import java.util.List;

/**
 * REST Controller for handling operations related to employee data retrieval.
 * This controller provides an endpoint to fetch a list of all employees.
 * <p>
 * All endpoints are prefixed with the base path {@code /employees}.
 * </p>
 *
 * @author lynnyk821
 * @version 1.0
 */
@RestController
@RequestMapping("/employees")
@RequiredArgsConstructor
public class EmployeeController {

    /**
     * The service responsible for retrieving employee data from the persistence layer.
     * Injected via constructor injection by Lombok's {@code @RequiredArgsConstructor}.
     */
    private final EmployeeService employeeService;

    /**
     * Retrieves a list of all employees.
     * <p>
     * This is a GET endpoint that returns a collection of all employees in the system,
     * typically formatted as Data Transfer Objects (DTOs) containing relevant employee information.
     * </p>
     * Example usage:
     * <pre>
     * {@code
     * GET /employees
     * }
     * </pre>
     *
     * @return a {@link ResponseEntity} containing a list of {@link EmployeeDTO} objects
     *         with an HTTP 200 (OK) status code. Returns an empty list if no employees exist.
     * @see EmployeeService#findAllEmployees()
     */
    @GetMapping
    public ResponseEntity<List<EmployeeDTO>> getAllEmployees() {
        List<EmployeeDTO> employees = this.employeeService.findAllEmployees();
        return ResponseEntity.ok().body(employees);
    }
}
