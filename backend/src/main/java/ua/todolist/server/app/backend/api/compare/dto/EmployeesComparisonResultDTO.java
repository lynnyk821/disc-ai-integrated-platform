package ua.todolist.server.app.backend.api.compare.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import ua.todolist.server.app.backend.api.employee.dto.EmployeeDTO;

import java.util.List;

@Builder
@Getter @Setter
public class EmployeesComparisonResultDTO {
    private List<EmployeeDTO> employees;
    private List<Similarity> similarities;
    private List<DiscComparison> detailedDiscComparison;
    private List<IndividualEmployeeProfile> individualEmployeeProfiles;

    @Getter @Setter
    public static class Similarity {
        private String similar;
        private String message;
        private Double scoreRange;
    }

    @Getter @Setter
    public static class DiscComparison {
        private String sector;
        private Employee highestEmployee;
        private Employee lowestEmployee;
        private Double averageScore;
        private Double rangeScore;
        private List<Employee> employees;

        @Getter @Setter
        public static class Employee {
            private String name;
            private Integer score;
        }
    }

    @Getter @Setter
    public static class IndividualEmployeeProfile {
        private String name;
        private String company;
        private String position;
        private Integer dominanceScore;
        private Integer influenceScore;
        private Integer steadinessScore;
        private Integer consncientionScore;
    }
}