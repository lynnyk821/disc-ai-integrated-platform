package ua.todolist.server.app.backend.api.chart;


import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ua.todolist.server.app.backend.api.chart.dto.ChartEmployeeDataDTO;
import ua.todolist.server.app.backend.service.chart.ChartService;

import java.util.List;

/**
 * REST Controller for handling HTTP requests related to chart data.
 * This controller provides an endpoint to retrieve a list of employee data
 * specifically formatted for chart visualizations.
 * <p>
 * All endpoints are prefixed with the base path {@code /chart}.
 * </p>
 *
 * @author lynnyk821
 * @version 1.0
 */
@RestController
@RequestMapping("/chart")
@RequiredArgsConstructor
public class ChartController {

    /**
     * The service responsible for retrieving and processing employee chart data.
     * Injected via constructor injection by Lombok's {@code @RequiredArgsConstructor}.
     */
    private final ChartService chartService;

    /**
     * Retrieves a list of employee data formatted for chart display.
     * <p>
     * This is a GET endpoint that returns a collection of {@link ChartEmployeeDataDTO} objects
     * containing the necessary information for chart rendering. The data typically includes
     * employee metrics suitable for visual representation such as discs or other charts.
     * </p>
     * Example usage:
     * <pre>
     * {@code
     * GET /chart
     * }
     * </pre>
     *
     * @return a {@link ResponseEntity} containing a list of {@link ChartEmployeeDataDTO} objects
     *         with an HTTP 200 (OK) status code. Returns an empty list if no data is available.
     * @see ChartService#getListOfEmployeeChartData()
     */
    @GetMapping
    public ResponseEntity<List<ChartEmployeeDataDTO>> getDiscChart() {
        List<ChartEmployeeDataDTO> response = this.chartService.getListOfEmployeeChartData();
        return ResponseEntity.ok().body(response);
    }
}
