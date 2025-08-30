package ua.todolist.server.app.backend.api.compare;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import ua.todolist.server.app.backend.api.compare.dto.EmployeesComparisonRequest;
import ua.todolist.server.app.backend.api.compare.dto.EmployeesComparisonResultDTO;
import ua.todolist.server.app.backend.service.compare.CompareEmployeesService;

@RestController
@RequestMapping("/compare")
@RequiredArgsConstructor
@Validated
public class CompareEmployeesController {
    private final CompareEmployeesService compareEmployeesService;

    @PostMapping("/employees")
    public ResponseEntity<EmployeesComparisonResultDTO> compareEmployees(
        @Valid @RequestBody EmployeesComparisonRequest request
    ) {
        EmployeesComparisonResultDTO comparisonResult = this.compareEmployeesService.compareEmployees(request.getEmployeeIds());
        return ResponseEntity.ok(comparisonResult);
    }
}
