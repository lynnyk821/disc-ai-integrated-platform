package ua.todolist.server.app.backend.service.compare;

import ua.todolist.server.app.backend.api.compare.dto.EmployeesComparisonResultDTO;
import ua.todolist.server.app.backend.database.entity.EmployeeEntity;

import java.util.List;

public interface SimilarityAnalysisService {
    List<EmployeesComparisonResultDTO.Similarity> calculateSimilarity(List<EmployeeEntity> employees);
}
