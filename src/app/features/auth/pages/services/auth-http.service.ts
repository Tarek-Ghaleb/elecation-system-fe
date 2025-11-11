import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppConfigService } from '../../../../core/services/app-config.service';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root',
})
export class AuthHttpService {
  lang: string;
  authBaseURL: string;
  loginURL: string;

  constructor(
    private http: HttpClient,
    private environment: AppConfigService,
    private translate: TranslateService
  ) {
    this.lang = localStorage.getItem('language') == 'en' ? 'en' : 'ar';
    this.authBaseURL = environment?.config?.servicesBaseUrl + 'Account';
    this.loginURL = this.authBaseURL + '/login';
  }

  submitLoginAPI(model: any) {
    return this.http.post<any>(this.loginURL, model);
  }
}
