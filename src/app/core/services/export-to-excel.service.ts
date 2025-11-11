import { Injectable } from '@angular/core';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

@Injectable({
  providedIn: 'root',
})
export class ExportToExcelService {
  constructor() {}

  /**
   * Exports JSON data to an Excel file
   * @param data - Array of objects to export
   * @param fileName - Name of the Excel file
   */
  exportToExcel(data: any[], fileName: string): void {
    if (!data || data.length === 0) {
      console.error('No data available to export');
      return;
    }

    // Create worksheet from data
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data);

    // Create workbook and append worksheet
    const workbook: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');

    // Write workbook and convert to Blob
    const excelBuffer: any = XLSX.write(workbook, {
      bookType: 'xlsx',
      type: 'array',
    });
    const dataBlob: Blob = new Blob([excelBuffer], {
      type: 'application/octet-stream',
    });

    // Save the file
    saveAs(dataBlob, `${fileName}.xlsx`);
  }

  exportToCustomExcel(customHeaders: any, data: any, fileName: any) {
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet([]);
    XLSX.utils.sheet_add_aoa(ws, customHeaders);
    XLSX.utils.sheet_add_json(ws, data, { origin: 'A1', skipHeader: true });
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, `${fileName}.xlsx`);
  }
}
