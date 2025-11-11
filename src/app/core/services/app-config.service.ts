import { Injectable, Injector } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AppConfigService {
  private appConfig: any;

  constructor(private injector: Injector) {}

  loadAppConfig() {
    let http = this.injector.get(HttpClient);

    return http
      .get('assets/appConfig.json')
      .toPromise()
      .then((data) => {
        this.appConfig = data;
      })
      .catch((error: any) => {
        console.error('Error loading config.json:', error);
      });
  }

  get config() {
    return this.appConfig;
  }
}
