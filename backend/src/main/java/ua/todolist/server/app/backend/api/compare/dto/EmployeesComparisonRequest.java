package ua.todolist.server.app.backend.api.compare.dto;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter @Setter
public class EmployeesComparisonRequest {
    @NotEmpty(message = "Employee names list cannot be empty")
    @Size(min = 2, message = "Please select at least 2 employees for comparison")
    private List<Long> employeeIds;
}
