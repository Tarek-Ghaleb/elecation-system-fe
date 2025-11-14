import { Component, inject, OnInit, signal, TemplateRef, WritableSignal } from '@angular/core';
import { AreaHttpService } from '../../../auth/pages/services/region-services/area-http.service';
import { Subject } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpService } from '../../../../core/services/http.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Regions } from '../../interfaces/admin.interfaces';


@Component({
  selector: 'app-region-page',
  templateUrl: './region-page.component.html',
  styleUrl: './region-page.component.scss'
})
export class RegionPageComponent implements OnInit {
  mainRegions: Regions[] = [];
  private modalService = inject(NgbModal);
  closeResult: WritableSignal<string> = signal('');
  page = 1;
  pageSize = 4;
  loading: boolean = false;
  error: string | null = null;
  private destroy$ = new Subject<void>();
  sidebarOpen = false;
  regions: Regions[] = [];
 addForm!: FormGroup;

  constructor(
    private http: HttpService,
    private _formbuilder: FormBuilder,
  ) {


  }


  ngOnInit(): void {
   
    this.GetAllAreas();
    this.intlizeForm();
  }

  intlizeForm(){
    this.addForm = this._formbuilder.group({
      name: ['', Validators.required],
    }); 
  }


  GetAllAreas() {
    this.http.get(`Area/GetAll`).subscribe(
      (res:any) => {
this.mainRegions = res.areas
this.refreshCountries();
      });
  }

  refreshCountries() {
    const start = (this.page - 1) * this.pageSize;
    this.regions = this.mainRegions.slice(start, start + this.pageSize);
  }

 
 onPageSizeChange(newSize: number) {
    this.pageSize = newSize;
    this.page = 1;
    this.refreshCountries();
  }

    open(content: TemplateRef<any>) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
      (result) => {
        this.closeResult.set(`Closed with: ${result}`);
      },
      (reason) => {
        this.closeResult.set(`Dismissed ${this.getDismissReason(reason)}`);
      },
    );
  }

  getDismissReason(reason: any) {
    throw new Error('Method not implemented.');
  }

  toggleStatus(point:any){

  }

  submitAdd(){
    let payload={
      name:this.addForm.value.name
    }

    this.http.post(`Area/add-new-area`,payload).subscribe(
      (res:any) => {
        this.GetAllAreas();
        this.modalService.dismissAll();

      });

  }

  submitEdit(){}

  submitDelete(){}



}
