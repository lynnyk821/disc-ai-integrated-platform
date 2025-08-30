package ua.todolist.server.app.backend.api.chart;


import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ua.todolist.server.app.backend.api.chart.dto.ChartEmployeeDataDTO;
import ua.todolist.server.app.backend.service.chart.ChartService;

import java.util.List;

@RestController
@RequestMapping("/chart")
@RequiredArgsConstructor
public class ChartController {
    private final ChartService chartService;

    @GetMapping
    public ResponseEntity<List<ChartEmployeeDataDTO>> getDiscChart() {
        List<ChartEmployeeDataDTO> response = this.chartService.getListOfEmployeeChartData();
        return ResponseEntity.ok().body(response);
    }
}
