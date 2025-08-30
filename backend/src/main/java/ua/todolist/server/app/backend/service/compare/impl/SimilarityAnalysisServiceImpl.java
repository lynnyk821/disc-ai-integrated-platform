package ua.todolist.server.app.backend.service.compare.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import ua.todolist.server.app.backend.api.compare.dto.EmployeesComparisonResultDTO;
import ua.todolist.server.app.backend.database.entity.EmployeeEntity;
import ua.todolist.server.app.backend.service.compare.SimilarityAnalysisService;
import ua.todolist.server.app.backend.service.disc.DiscCalculatorService;
import ua.todolist.server.app.backend.type.DiscType;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.function.Function;

@Service
@RequiredArgsConstructor
public class SimilarityAnalysisServiceImpl implements SimilarityAnalysisService {
    private final DiscCalculatorService discCalculatorService;

    @Override
    public List<EmployeesComparisonResultDTO.Similarity> calculateSimilarity(List<EmployeeEntity> employees) {
        List<EmployeesComparisonResultDTO.Similarity> similarities = new ArrayList<>();

        if (employees == null || employees.size() < 2) {
            return similarities;
        }

        checkSimilarity(similarities, DiscType.DOMINANCE, employees, discCalculatorService::calculateDominanceScore);
        checkSimilarity(similarities, DiscType.INFLUENCE, employees, discCalculatorService::calculateInfluenceScore);
        checkSimilarity(similarities, DiscType.STEADINESS, employees, discCalculatorService::calculateSteadinessScore);
        checkSimilarity(similarities, DiscType.CONSCIENTIOUSNESS, employees, discCalculatorService::calculateConscientiousnessScore);

        return similarities;
    }

    private void checkSimilarity(List<EmployeesComparisonResultDTO.Similarity> similarities, DiscType discType,
                                 List<EmployeeEntity> employees, Function<EmployeeEntity, Integer> scoreCalculator) {
        List<Integer> scores = employees.stream().map(scoreCalculator).toList();

        int min = Collections.min(scores);
        int max = Collections.max(scores);
        double range = max - min;

        if (range <= 15.0) {
            EmployeesComparisonResultDTO.Similarity similarity = new EmployeesComparisonResultDTO.Similarity();
            similarity.setSimilar(String.valueOf(discType));
            similarity.setMessage("All selected employees show similar levels of " + String.valueOf(discType).toLowerCase());
            similarity.setScoreRange(range);
            similarities.add(similarity);
        }
    }
}
