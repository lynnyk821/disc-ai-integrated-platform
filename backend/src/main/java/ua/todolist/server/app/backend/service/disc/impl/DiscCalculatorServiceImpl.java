package ua.todolist.server.app.backend.service.disc.impl;

import org.springframework.stereotype.Service;
import ua.todolist.server.app.backend.database.entity.EmployeeEntity;
import ua.todolist.server.app.backend.service.disc.DiscCalculatorService;

@Service
public class DiscCalculatorServiceImpl implements DiscCalculatorService {

    @Override
    public Integer calculateDominanceScore(EmployeeEntity employee) {
        double score = weightedAverage(
                employee.getControllerAssertive(), 0.35,
                employee.getCompetitive(), 0.30,
                employee.getAssertive(), 0.25,
                employee.getConfrontPeople(), 0.10
        );
        return normalizeScore(score);
    }

    @Override
    public Integer calculateInfluenceScore(EmployeeEntity employee) {
        double score = weightedAverage(
                employee.getExpressiveSocial(), 0.40,
                employee.getWarmAndSociable(), 0.30,
                employee.getTalking(), 0.20,
                employee.getSocialInitiative(), 0.10
        );
        return normalizeScore(score);
    }

    @Override
    public Integer calculateSteadinessScore(EmployeeEntity employee) {
        double score = weightedAverage(
                employee.getSupporterEmpathy(), 0.40,
                employee.getPatience(), 0.30,
                employee.getListening(), 0.20,
                employee.getAppreciation(), 0.10
        );
        return normalizeScore(score);
    }

    @Override
    public Integer calculateConscientiousnessScore(EmployeeEntity employee) {
        double score = weightedAverage(
                employee.getAnalyzerLogical(), 0.40,
                employee.getAttentionToDetail(), 0.30,
                employee.getOrganization(), 0.20,
                employee.getConfrontPaperwork(), 0.10
        );
        return normalizeScore(score);
    }

    private double weightedAverage(Double value1, double weight1,
                                   Double value2, double weight2,
                                   Double value3, double weight3,
                                   Double value4, double weight4) {
        double total = 0;
        double totalWeight = 0;

        if (value1 != null) {
            total += value1 * weight1;
            totalWeight += weight1;
        }
        if (value2 != null) {
            total += value2 * weight2;
            totalWeight += weight2;
        }
        if (value3 != null) {
            total += value3 * weight3;
            totalWeight += weight3;
        }
        if (value4 != null) {
            total += value4 * weight4;
            totalWeight += weight4;
        }

        return totalWeight > 0 ? total / totalWeight : 0;
    }

    private Integer normalizeScore(double score) {
        return (int) Math.round(Math.max(-100, Math.min(100, score)));
    }
}
