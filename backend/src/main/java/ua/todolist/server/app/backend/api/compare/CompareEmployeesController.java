package ua.todolist.server.app.backend.api.compare;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import ua.todolist.server.app.backend.api.compare.dto.EmployeesComparisonRequest;
import ua.todolist.server.app.backend.api.compare.dto.EmployeesComparisonResultDTO;
import ua.todolist.server.app.backend.service.compare.CompareEmployeesService;

/**
 * REST Controller for handling operations related to comparing employees.
 * This controller provides an endpoint to compare a set of employees based on their IDs
 * and retrieve a structured comparison result.
 * <p>
 * All endpoints are prefixed with the base path {@code /compare}.
 * </p>
 *
 * @author lynnyk821
 * @version 1.0
 */
@RestController
@RequestMapping("/compare")
@RequiredArgsConstructor
@Validated
public class CompareEmployeesController {

    /**
     * The service responsible for the business logic of comparing employees.
     * Injected via constructor injection by Lombok's {@code @RequiredArgsConstructor}.
     */
    private final CompareEmployeesService compareEmployeesService;

    /**
     * Compares a set of employees identified by their IDs and returns a structured comparison result.
     * <p>
     * This endpoint accepts a POST request with a JSON body containing a list of employee IDs.
     * The request body is automatically validated according to the constraints defined in
     * {@link EmployeesComparisonRequest}. The result typically contains comparative metrics
     * or analysis between the specified employees.
     * </p>
     * Example request body:
     * <pre>
     * {@code
     * {
     *   "employeeIds": [101, 204, 352]
     * }
     * }
     * </pre>
     *
     * @param request the request object containing the list of employee IDs to compare.
     *                Must be a valid request as per the bean validation constraints.
     * @return a {@link ResponseEntity} containing an {@link EmployeesComparisonResultDTO}
     *         with the comparison data and an HTTP 200 (OK) status code.
     * @throws jakarta.validation.ConstraintViolationException if the request validation fails.
     */
    @PostMapping("/employees")
    public ResponseEntity<EmployeesComparisonResultDTO> compareEmployees(
            @Valid @RequestBody EmployeesComparisonRequest request
    ) {
        EmployeesComparisonResultDTO comparisonResult = this.compareEmployeesService.compareEmployees(request.getEmployeeIds());
        return ResponseEntity.ok(comparisonResult);
    }
}
