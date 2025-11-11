import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppConfigService } from './app-config.service';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  baseURL!: string;

  private defaultHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  constructor(private http: HttpClient, private environment: AppConfigService) {
    this.baseURL = environment?.config?.servicesBaseUrl;
  }

  get<T>(url: string, params?: any, headers?: HttpHeaders): Observable<T> {
    const httpParams = new HttpParams({ fromObject: params || {} });
    return this.http.get<T>(this.baseURL + url, {
      params: httpParams,
      headers: headers || this.defaultHeaders,
    });
  }

  post<T>(url: string, body: any, headers?: HttpHeaders): Observable<T> {
    const isFormData = body instanceof FormData;
    return this.http.post<T>(this.baseURL + url, body, {
      headers: isFormData ? undefined : headers || this.defaultHeaders,
    });
  }

  put<T>(url: string, body: any, headers?: HttpHeaders): Observable<T> {
    return this.http.put<T>(this.baseURL + url, body, {
      headers: headers || this.defaultHeaders,
    });
  }

  delete<T>(url: string, params?: any, headers?: HttpHeaders): Observable<T> {
    const httpParams = new HttpParams({ fromObject: params || {} });
    return this.http.delete<T>(this.baseURL + url, {
      params: httpParams,
      headers: headers || this.defaultHeaders,
    });
  }

  patch<T>(url: string, body: any, headers?: HttpHeaders): Observable<T> {
    return this.http.patch<T>(this.baseURL + url, body, {
      headers: headers || this.defaultHeaders,
    });
  }
}
