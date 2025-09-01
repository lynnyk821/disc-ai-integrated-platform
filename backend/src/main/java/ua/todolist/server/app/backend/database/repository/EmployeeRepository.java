package ua.todolist.server.app.backend.database.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ua.todolist.server.app.backend.database.entity.EmployeeEntity;

import java.awt.font.OpenType;
import java.util.Optional;

public interface EmployeeRepository extends JpaRepository<EmployeeEntity, Long> {
    Boolean existsByExamineeId(String examineeId);
    Optional<EmployeeEntity> findByName(String name);
}
