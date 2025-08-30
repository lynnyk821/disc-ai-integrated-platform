package ua.todolist.server.app.backend.service.disc;

import ua.todolist.server.app.backend.database.entity.EmployeeEntity;

public interface DiscCalculatorService {
    Integer calculateDominanceScore(EmployeeEntity employee);
    Integer calculateInfluenceScore(EmployeeEntity employee);
    Integer calculateSteadinessScore(EmployeeEntity employee);
    Integer calculateConscientiousnessScore(EmployeeEntity employee);
}
