package ua.todolist.server.app.backend.mapper;

import lombok.RequiredArgsConstructor;
import org.apache.poi.ss.usermodel.Row;
import org.springframework.stereotype.Component;
import ua.todolist.server.app.backend.database.entity.EmployeeChartDataEntity;
import ua.todolist.server.app.backend.database.entity.EmployeeEntity;
import ua.todolist.server.app.backend.utils.ParseUtils;

import static java.lang.Double.parseDouble;

@Component
@RequiredArgsConstructor
public class UploadEmployeeMapper {
    private final ParseUtils cellUtils;

    public EmployeeEntity mapToEmployeeFromStringRecord(String[] record) {
        return EmployeeEntity.builder()
                .examineeId(record[0])
                .groupId(record[1])
                .name(record[2])
                .assessmentDate(record[3])
                .company(record[4])
                .position(record[5])
                .behaviorTypeClass(record[6])
                .behaviorTypeComment(record[7])
                .aiSummaryComment(record[8])
                .aiStressMotiveComment(record[9])
                .aiRelateToOthersComment(record[10])
                .time(record[11])
                .analyzerLogical(parseDouble(record[12]))
                .controllerAssertive(parseDouble(record[13]))
                .expressiveSocial(parseDouble(record[14]))
                .supporterEmpathy(parseDouble(record[15]))
                .attentionToDetail(parseDouble(record[16]))
                .organization(parseDouble(record[17]))
                .confrontPaperwork(parseDouble(record[18]))
                .assertive(parseDouble(record[19]))
                .competitive(parseDouble(record[20]))
                .selfEsteem(parseDouble(record[21]))
                .confrontPeople(parseDouble(record[22]))
                .warmAndSociable(parseDouble(record[23]))
                .talking(parseDouble(record[24]))
                .listening(parseDouble(record[25]))
                .appreciation(parseDouble(record[26]))
                .patience(parseDouble(record[27]))
                .socialInitiative(parseDouble(record[28]))
                .build();
    }

    public EmployeeChartDataEntity mapToEmployeeChartFromRow(Row row) {
        return EmployeeChartDataEntity.builder()
                .name(cellUtils.getStringCellValue(row.getCell(0)))
                .initials(cellUtils.getStringCellValue(row.getCell(1)))
                .xScore(cellUtils.getNumericCellValue(row.getCell(2)))
                .yScore(cellUtils.getNumericCellValue(row.getCell(3)))
        .build();
    }
}
