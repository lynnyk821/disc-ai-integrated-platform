import { useState, useRef } from "react";
import axios from "axios";
import { Upload, FileText, AlertCircle, CheckCircle2, X } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Alert, AlertDescription } from "./ui/alert";
import { Badge } from "./ui/badge";

interface UploadedFile {
  id: string;
  name: string;
  type: "disc_chart" | "disc_data";
  size: number;
  status: "pending" | "success" | "error";
  file?: File;
}

export function FileUpload() {
  const [csvFile, setCsvFile] = useState<UploadedFile | null>(null);
  const [excelFile, setExcelFile] = useState<UploadedFile | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  // Додаємо рефи для input'ів
  const csvInputRef = useRef<HTMLInputElement>(null);
  const excelInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (files: FileList | null, type: "csv" | "excel") => {
    if (!files || files.length === 0) return;

    const file = files[0];
    if (type === "csv" && !file.name.toLowerCase().endsWith(".csv")) {
      alert("Please select a CSV file");
      return;
    }
    if (
        type === "excel" &&
        !(file.name.toLowerCase().endsWith(".xls") || file.name.toLowerCase().endsWith(".xlsx"))
    ) {
      alert("Please select an Excel file (.xls/.xlsx)");
      return;
    }

    const uploadedFile: UploadedFile = {
      id: Math.random().toString(36).substr(2, 9),
      name: file.name,
      type: type === "csv" ? "disc_chart" : "disc_data",
      size: file.size,
      status: "pending",
      file,
    };

    if (type === "csv") {
      setCsvFile(uploadedFile);
    } else {
      setExcelFile(uploadedFile);
    }
  };

  const handleUpload = async () => {
    if (!csvFile || !excelFile) {
      alert("Both files are required");
      return;
    }

    setIsProcessing(true);

    try {
      const formData = new FormData();
      formData.append("dataCSV", csvFile.file as File);
      formData.append("chartDataExcel", excelFile.file as File);

      await axios.post("http://localhost:8080/api/upload/disc", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      // Скидаємо файли після успішного завантаження
      setCsvFile(null);
      setExcelFile(null);

      // Очищаємо значення input'ів
      if (csvInputRef.current) csvInputRef.current.value = "";
      if (excelInputRef.current) excelInputRef.current.value = "";

    } catch (error) {
      console.error(error);
      setCsvFile((prev) => (prev ? { ...prev, status: "error" } : prev));
      setExcelFile((prev) => (prev ? { ...prev, status: "error" } : prev));
    } finally {
      setIsProcessing(false);
    }
  };

  const removeFile = (type: "csv" | "excel") => {
    if (type === "csv") {
      setCsvFile(null);
      if (csvInputRef.current) csvInputRef.current.value = "";
    } else {
      setExcelFile(null);
      if (excelInputRef.current) excelInputRef.current.value = "";
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const renderDropZone = (
      label: string,
      type: "csv" | "excel",
      file: UploadedFile | null,
      inputRef: React.RefObject<HTMLInputElement>
  ) => (
      <div
          className={`
        relative border-2 border-dashed rounded-lg p-6 text-center transition-colors
        ${file ? "border-primary" : "border-muted-foreground/25 hover:border-muted-foreground/50"}
      `}
      >
        <input
            ref={inputRef}
            type="file"
            accept={type === "csv" ? ".csv" : ".xls,.xlsx"}
            onChange={(e) => handleFileSelect(e.target.files, type)}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />

        <div className="space-y-3">
          <p className="text-md font-medium">{label}</p>
          <div className="mx-auto w-10 h-10 rounded-full bg-muted flex items-center justify-center">
            <Upload className="h-5 w-5 text-muted-foreground" />
          </div>
        </div>

        {file && (
            <div className="mt-4 flex items-center justify-between p-2 border rounded-lg bg-background">
              <div className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="font-medium">{file.name}</p>
                  <span className="text-sm text-muted-foreground">
                {formatFileSize(file.size)}
              </span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {file.status === "pending" && <Badge variant="outline">Pending</Badge>}
                {file.status === "success" && <CheckCircle2 className="h-4 w-4 text-green-600" />}
                {file.status === "error" && <AlertCircle className="h-4 w-4 text-destructive" />}
                <Button variant="ghost" size="sm" onClick={() => removeFile(type)}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
        )}
      </div>
  );

  return (
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Upload className="h-5 w-5" />
              Upload DISC Dataset Files
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {renderDropZone("Chart Data (CSV)", "csv", csvFile, csvInputRef)}
            {renderDropZone("Detailed Data (Excel)", "excel", excelFile, excelInputRef)}

            <Button
                className="w-full"
                onClick={handleUpload}
                disabled={!csvFile || !excelFile || isProcessing}
            >
              {isProcessing ? "Uploading..." : "Upload Both Files"}
            </Button>

            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                Please upload separately:
                – CSV file for chart data
                – Excel (.xlsx/.xls) file for detailed data
                Once both files are selected, click <b>Upload Both Files</b>.
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>
      </div>
  );
}