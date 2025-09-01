import { useState, useEffect } from "react";
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, ResponsiveContainer, ReferenceLine, Tooltip } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";
import axios from "axios";

interface ChartEmployeeDataDTO {
  name: string;
  initials: string;
  xScore: number;
  yScore: number;
}

interface DISCChartProps {
  onEmployeeSelect?: (employees: ChartEmployeeDataDTO[]) => void;
}

export function DISCChart({ onEmployeeSelect }: DISCChartProps) {
  const [chartData, setChartData] = useState<ChartEmployeeDataDTO[]>([]);
  const [selectedEmployees, setSelectedEmployees] = useState<string[]>([]);
  const [hoveredEmployee, setHoveredEmployee] = useState<ChartEmployeeDataDTO | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    axios
        .get<any[]>(`https://disc-platform-ai-backend.onrender.com/api/chart`)
        .then((res) => {
          const convertedData = res.data.map(item => ({
            name: item.name,
            initials: item.initials,
            xScore: item.xscore !== undefined ? Number(item.xscore) : 0,
            yScore: item.yscore !== undefined ? Number(item.yscore) : 0
          }));

          setChartData(convertedData);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Error fetching DISC chart data", err);
          setError("Не вдалося завантажити дані");
          setLoading(false);
        });
  }, []);

  const handleEmployeeToggle = (employee: ChartEmployeeDataDTO) => {
    const newSelection = selectedEmployees.includes(employee.name)
        ? selectedEmployees.filter((n) => n !== employee.name)
        : [...selectedEmployees, employee.name];

    setSelectedEmployees(newSelection);

    const selectedData = chartData.filter((emp) => newSelection.includes(emp.name));
    onEmployeeSelect?.(selectedData);
  };

  const getQuadrantColor = (x: number, y: number) => {
    if (x > 0 && y > 0) return "#3b82f6"; // Синій для D/C
    if (x > 0 && y <= 0) return "#ef4444"; // Червоний для D/I
    if (x <= 0 && y > 0) return "#10b981"; // Зелений для S/C
    return "#f59e0b"; // Жовтий для S/I
  };

  const getQuadrantLabel = (x: number, y: number) => {
    if (x > 0 && y > 0) return "High D, High C";
    if (x > 0 && y <= 0) return "High D, High I";
    if (x <= 0 && y > 0) return "High S, High C";
    return "High S, High I";
  };

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length > 0) {
      const data = payload[0].payload as ChartEmployeeDataDTO;
      return (
          <div className="bg-background border rounded-lg p-3 shadow-lg">
            <p className="font-medium">{data.name}</p>
            <p className="text-xs text-muted-foreground mt-2">
              Quadrant: {getQuadrantLabel(data.xScore, data.yScore)}
            </p>
          </div>
      );
    }
    return null;
  };

  const CustomDot = (props: any) => {
    const { cx, cy, payload } = props;
    const isSelected = selectedEmployees.includes(payload.name);
    const isHovered = hoveredEmployee?.name === payload.name;
    const dotColor = getQuadrantColor(payload.xScore, payload.yScore);

    return (
        <g>
          <circle
              cx={cx}
              cy={cy}
              r={isSelected || isHovered ? 8 : 6}
              fill={dotColor}
              stroke={isSelected ? "#1f2937" : "transparent"}
              strokeWidth={isSelected ? 2 : 0}
              className="cursor-pointer transition-all"
              onClick={() => handleEmployeeToggle(payload)}
              onMouseEnter={() => setHoveredEmployee(payload)}
              onMouseLeave={() => setHoveredEmployee(null)}
          />
          <text
              x={cx}
              y={cy}
              textAnchor="middle"
              dominantBaseline="middle"
              className="text-xs fill-white font-medium pointer-events-none"
          >
            {payload.initials}
          </text>
        </g>
    );
  };

  return (
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>DISC Behavioral Chart</CardTitle>
            <div className="text-sm text-muted-foreground">
              Click on employees to select them for comparison.
            </div>
          </CardHeader>
          <CardContent>
            {loading && <p className="text-center text-muted-foreground">Завантаження даних...</p>}
            {error && <p className="text-center text-red-500">{error}</p>}

            {!loading && !error && (
                <>
                  <div className="h-96 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <ScatterChart margin={{ top: 20, right: 20, bottom: 40, left: 40 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis
                            type="number"
                            dataKey="xScore"
                            domain={[-100, 100]}
                            label={{ value: "Dominance ← → Steadiness", position: "bottom", offset: -20 }}
                        />
                        <YAxis
                            type="number"
                            dataKey="yScore"
                            domain={[-100, 100]}
                            label={{ value: "Conscientiousness ← → Influence", angle: -90, position: "insideLeft" }}
                        />
                        <ReferenceLine x={0} stroke="#666" />
                        <ReferenceLine y={0} stroke="#666" />
                        <Tooltip content={<CustomTooltip />} />
                        <Scatter data={chartData} shape={<CustomDot />} />
                      </ScatterChart>
                    </ResponsiveContainer>
                  </div>

                  {/* Selected Employees */}
                  {selectedEmployees.length > 0 && (
                      <div className="mt-4">
                        <h4 className="mb-2">Selected for Comparison ({selectedEmployees.length})</h4>
                        <div className="flex flex-wrap gap-2">
                          {chartData
                              .filter((emp) => selectedEmployees.includes(emp.name))
                              .map((employee) => (
                                  <Badge key={employee.name} variant="outline" className="bg-blue-50">
                                    {employee.name}
                                  </Badge>
                              ))}
                        </div>
                        <Button
                            variant="outline"
                            size="sm"
                            className="mt-2"
                            onClick={() => setSelectedEmployees([])}
                        >
                          Clear Selection
                        </Button>
                      </div>
                  )}

                  {/* All Employees List */}
                  <div className="mt-6">
                    <h4 className="mb-3">All Employees</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 max-h-48 overflow-y-auto">
                      {chartData.map((employee) => (
                          <div
                              key={employee.name}
                              className="flex items-center space-x-2 p-2 hover:bg-muted rounded cursor-pointer"
                              onClick={() => handleEmployeeToggle(employee)}
                          >
                            <Checkbox
                                checked={selectedEmployees.includes(employee.name)}
                                onChange={() => handleEmployeeToggle(employee)}
                            />
                            <span className="text-sm font-medium">{employee.name}</span>
                          </div>
                      ))}
                    </div>
                  </div>
                </>
            )}
          </CardContent>
        </Card>
      </div>
  );
}