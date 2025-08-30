package ua.todolist.server.app.backend.database.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ua.todolist.server.app.backend.database.entity.EmployeeEntity;

public interface EmployeeRepository extends JpaRepository<EmployeeEntity, Long> {
    Boolean existsByExamineeId(String examineeId);
}
