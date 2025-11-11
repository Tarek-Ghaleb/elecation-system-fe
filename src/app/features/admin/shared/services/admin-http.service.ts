import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { LookupItems } from '../interfaces/lookupItems-interface';
import { AppConfigService } from '../../../../core/services/app-config.service';

@Injectable({
  providedIn: 'root',
})
export class AdminHttpService {
  adminBaseURL: string;

  constructor(private http: HttpClient, private environment: AppConfigService) {
    this.adminBaseURL = this.environment?.config?.servicesBaseUrl;
  }

  private buildUrl(path: string): string {
    const base = this.adminBaseURL.endsWith('/')
      ? this.adminBaseURL
      : this.adminBaseURL + '/';
    return `${base}${path}`;
  }

  getLookupListAPI(url: any): Observable<LookupItems[]> {
    const apiURL = this.buildUrl(url);
    return this.http.get<any>(apiURL).pipe(
      map((res) => {
        return (res.data || []).map((item: any) => ({
          id: item.id,
          englishName: item.nameEn,
          arabicName: item.nameAr,
          email: item.email,
          name: item.name,
          branchId: item.branchId,
          branchName: item.branchName,
          departmentId: item.departmentId,
          departmentName: item.departmentName,
          regionId: item.regionId,
          regionName: item.regionName,
          logoUrl: item.imageURL ?? '',
        }));
      })
    );
  }

  addLookupAPI(url: any, dto: LookupItems): Observable<any> {
    const apiURL = this.buildUrl(url);
    const body: any = {
      id: dto.id ?? 0,
    };
    if (dto?.englishName) {
      body.nameEn = dto.englishName;
    }
    if (dto?.arabicName) {
      body.nameAr = dto.arabicName;
    }
    if (dto?.name) {
      body.name = dto.name;
    }
    if (dto?.email) {
      body.email = dto.email;
    }
    if (dto?.regionId) {
      body.regionId = dto.regionId;
    }
    if (dto?.branchId) {
      body.branchId = dto.branchId;
    }
    if (dto?.departmentId) {
      body.departmentId = dto.departmentId;
    }
    return this.http.post(apiURL, body);
  }

  updateLookupAPI(url: any, dto: LookupItems): Observable<any> {
    const apiURL = this.buildUrl(url);
    const body: any = {
      id: dto.id ?? 0,
    };
    if (dto?.englishName) {
      body.nameEn = dto.englishName;
    }
    if (dto?.arabicName) {
      body.nameAr = dto.arabicName;
    }
    if (dto?.name) {
      body.name = dto.name;
    }
    if (dto?.email) {
      body.email = dto.email;
    }
    if (dto?.regionId) {
      body.regionId = dto.regionId;
    }
    if (dto?.branchId) {
      body.branchId = dto.branchId;
    }
    if (dto?.departmentId) {
      body.departmentId = dto.departmentId;
    }
    return this.http.post(apiURL, body);
  }

  addGenericWithFormData(url: string, formData: FormData): Observable<any> {
    const apiURL = this.buildUrl(url);
    return this.http.post(apiURL, formData);
  }

  updateGenericWithFormData(url: string, formData: FormData): Observable<any> {
    const apiURL = this.buildUrl(url);
    return this.http.post(apiURL, formData);
  }

  deleteLookupAPI(url: any, id: number): Observable<any> {
    const apiURL = this.buildUrl(url);
    const params = new HttpParams().set('id', id.toString());
    return this.http.post(apiURL, null, { params });
  }
}
