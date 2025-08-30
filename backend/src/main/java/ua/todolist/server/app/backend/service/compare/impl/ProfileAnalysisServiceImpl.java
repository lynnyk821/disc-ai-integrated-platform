package ua.todolist.server.app.backend.service.compare.impl;

import org.springframework.stereotype.Service;
import ua.todolist.server.app.backend.api.compare.dto.EmployeesComparisonResultDTO;
import ua.todolist.server.app.backend.database.entity.EmployeeEntity;
import ua.todolist.server.app.backend.service.compare.ProfileAnalysisService;

import java.util.List;

@Service
public class ProfileAnalysisServiceImpl implements ProfileAnalysisService {
    @Override
    public List<EmployeesComparisonResultDTO.IndividualEmployeeProfile> getIndividualEmployeeProfiles(List<EmployeeEntity> employees) {
        return List.of();
    }
}
