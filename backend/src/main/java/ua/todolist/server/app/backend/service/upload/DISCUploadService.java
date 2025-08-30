package ua.todolist.server.app.backend.service.upload;

import com.opencsv.exceptions.CsvException;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

public interface DISCUploadService {
    void uploadChartDataFromCsv(MultipartFile csv) throws IOException, CsvException;

    void uploadDataFromExcel(MultipartFile xlsx) throws IOException;
}
