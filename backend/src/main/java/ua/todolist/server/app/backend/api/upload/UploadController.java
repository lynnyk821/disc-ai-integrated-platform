package ua.todolist.server.app.backend.api.upload;

import com.opencsv.exceptions.CsvException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import ua.todolist.server.app.backend.service.upload.DISCUploadService;

import java.io.IOException;

@RestController
@RequestMapping("/upload")
@RequiredArgsConstructor
public class UploadController {
    private final DISCUploadService discUploadService;

    @PostMapping("/disc")
    public ResponseEntity<Void> uploadFile(
            @RequestParam("dataCSV") MultipartFile chartDataCSV,
            @RequestParam("chartDataExcel") MultipartFile dataXlsx
    ) throws IOException, CsvException {
        this.discUploadService.uploadChartDataFromCsv(chartDataCSV);
        this.discUploadService.uploadDataFromExcel(dataXlsx);

        return ResponseEntity.noContent().build();
    }
}
