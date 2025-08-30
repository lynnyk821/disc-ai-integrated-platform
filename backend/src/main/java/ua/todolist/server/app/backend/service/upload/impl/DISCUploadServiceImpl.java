package ua.todolist.server.app.backend.service.upload.impl;

import com.opencsv.CSVReader;
import com.opencsv.exceptions.CsvException;
import lombok.RequiredArgsConstructor;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import ua.todolist.server.app.backend.database.entity.EmployeeChartDataEntity;
import ua.todolist.server.app.backend.database.entity.EmployeeEntity;
import ua.todolist.server.app.backend.database.repository.EmployeeChartDataRepository;
import ua.todolist.server.app.backend.database.repository.EmployeeRepository;
import ua.todolist.server.app.backend.mapper.UploadEmployeeMapper;
import ua.todolist.server.app.backend.service.upload.DISCUploadService;

import java.io.IOException;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.List;

@Component
@RequiredArgsConstructor
public class DISCUploadServiceImpl implements DISCUploadService {
    private final UploadEmployeeMapper employeeMapper;
    private final EmployeeChartDataRepository employeeChartDataRepository;
    private final EmployeeRepository employeeRepository;

    @Override
    public void uploadDataFromExcel(MultipartFile csv) throws IOException {
        List<EmployeeChartDataEntity> employees = new ArrayList<>();
        Workbook workbook = new XSSFWorkbook(csv.getInputStream());
        Sheet sheet = workbook.getSheetAt(0);

        for (Row row : sheet) {
            if (row.getRowNum() == 0) continue; // пропускаємо заголовок

            // Перевірка, чи рядок порожній
            boolean isEmpty = true;
            for (Cell cell : row) {
                if (cell != null && cell.getCellType() != CellType.BLANK) {
                    String value = cell.toString().trim();
                    if (!value.isEmpty() && !"0".equals(value)) {
                        isEmpty = false;
                        break;
                    }
                }
            }
            if (isEmpty) continue;

            EmployeeChartDataEntity employeeChart = this.employeeMapper.mapToEmployeeChartFromRow(row);

            // Валідація: обов’язкове поле name
            if (employeeChart.getName() == null || employeeChart.getName().isBlank()) {
                continue;
            }

            if (!employeeChartDataRepository.existsByName(employeeChart.getName())) {
                employees.add(employeeChart);
            }
        }

        workbook.close();

        if (!employees.isEmpty()) {
            this.employeeChartDataRepository.saveAll(employees);
        }
    }

    @Override
    @Transactional
    public void uploadChartDataFromCsv(MultipartFile xlsx) throws IOException, CsvException {
        List<EmployeeEntity> employees = new ArrayList<>();

        try (CSVReader reader = new CSVReader(new InputStreamReader(xlsx.getInputStream()))) {
            List<String[]> records = reader.readAll();

            for (int i = 1; i < records.size(); i++) { // пропускаємо заголовок
                String[] record = records.get(i);

                // Якщо рядок пустий — пропускаємо
                if (record == null || record.length == 0) {
                    continue;
                }

                EmployeeEntity employee = this.employeeMapper.mapToEmployeeFromStringRecord(record);

                // Валідація: обов’язкові поля
                if (employee.getExamineeId() == null || employee.getExamineeId().isBlank()) {
                    continue;
                }
                if (employee.getName() == null || employee.getName().isBlank()) {
                    continue;
                }

                // Перевірка унікальності
                if (!employeeRepository.existsByExamineeId(employee.getExamineeId())) {
                    employees.add(employee);
                }
            }
        }

        if (!employees.isEmpty()) {
            this.employeeRepository.saveAll(employees);
        }
    }
}
