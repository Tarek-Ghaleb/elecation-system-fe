import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppConfigService } from '../../../../../core/services/app-config.service';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AreaHttpService {
  lang: string;
  baseUrl: string;
  GetAllAreas: string;
  GetById:string;
  AddArea:string;
  EditArea:string;
  DeleteArea:string;

  constructor(
    private http: HttpClient,
    private environment: AppConfigService,
    private translate: TranslateService
  ) {
    this.lang = localStorage.getItem('language') == 'en' ? 'en' : 'ar';
    this.baseUrl = environment?.config?.servicesBaseUrl + 'Area';
    this.GetAllAreas = this.baseUrl + '/GetAll';
    this.GetById=this.baseUrl+'/GetById';
    this.AddArea=this.baseUrl+'/Add';
    this.DeleteArea=this.baseUrl='/Delete';
    this.EditArea=this.baseUrl='/Update';
  }

  AddAreaFunc(model: any) {
    return this.http.post<any>(this.AddArea, model);
  }
   EditAreaFunc(model: any) {
    return this.http.post<any>(this.EditArea, model);
  }
  GetAllAreasFunc() : Observable<any>{
    return this.http.get(this.GetAllAreas);
  }
}
