package ua.todolist.server.app.backend.database.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ua.todolist.server.app.backend.database.entity.EmployeeChartDataEntity;

public interface EmployeeChartDataRepository extends JpaRepository<EmployeeChartDataEntity, Long> {
    Boolean existsByName(String name);
}
