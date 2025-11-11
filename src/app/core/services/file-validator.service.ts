import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FileValidatorService {
  constructor() {}

  validateFileType(file: File, allowedTypes: string[]): boolean {
    if (!file) return false;

    const fileName = file.name.toLowerCase();
    const fileType = file.type.toLowerCase();

    if (allowedTypes.some((type) => type.includes('/'))) {
      return allowedTypes.includes(fileType);
    }

    const fileExtension = fileName.split('.').pop();
    return allowedTypes.includes(fileExtension || '');
  }
}
