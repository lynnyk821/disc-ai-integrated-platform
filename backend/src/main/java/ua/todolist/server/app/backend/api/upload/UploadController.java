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

/**
 * REST Controller for handling file upload operations related to DISC data.
 * This controller provides an endpoint for uploading data files in CSV and Excel formats
 * to populate or update the system's chart data.
 * <p>
 * All endpoints are prefixed with the base path {@code /upload}.
 * </p>
 *
 * @author lynnyk821
 * @version 1.0
 */
@RestController
@RequestMapping("/upload")
@RequiredArgsConstructor
public class UploadController {

    /**
     * The service responsible for processing the uploaded files and persisting the data.
     * Injected via constructor injection by Lombok's {@code @RequiredArgsConstructor}.
     */
    private final DISCUploadService discUploadService;

    /**
     * Handles the upload of two files containing DISC chart data for processing.
     * <p>
     * This endpoint accepts a multipart/form-data POST request with two file parts:
     * one for CSV data and one for Excel data. The files are processed to upload chart
     * and supporting data into the system.
     * </p>
     * Example usage (using curl):
     * <pre>
     * {@code
     * curl -X POST -F "dataCSV=@chart.csv" -F "chartDataExcel=@data.xlsx" /upload/disc
     * }
     * </pre>
     *
     * @param chartDataCSV  the multipart file uploaded with the parameter name {@code dataCSV},
     *                      expected to be a CSV file containing chart data.
     * @param dataXlsx      the multipart file uploaded with the parameter name {@code chartDataExcel},
     *                      expected to be an Excel file (.xlsx) containing additional data.
     * @return a {@link ResponseEntity} with no content body and an HTTP 204 (No Content) status code
     *         upon successful upload and processing.
     * @throws java.io.IOException if an I/O error occurs during file reading or processing.
     * @throws com.opencsv.exceptions.CsvException if an error occurs during CSV parsing or validation.
     * @see DISCUploadService#uploadChartDataFromCsv(MultipartFile)
     * @see DISCUploadService#uploadDataFromExcel(MultipartFile)
     */
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
