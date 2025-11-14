import { Component, inject, OnInit, signal, TemplateRef, WritableSignal } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import { HttpService } from '../../../../core/services/http.service';
import { Regions, School } from '../../interfaces/admin.interfaces';
import { UserDataService } from '../../../../core/services/user-data.service';


@Component({
  selector: 'app-schools-page',
  templateUrl: './schools-page.component.html',
  styleUrl: './schools-page.component.scss'
})
export class SchoolsPageComponent implements OnInit {
  mainSchools: School[] = [];
  mainRegions: Regions[] = [];

  private modalService = inject(NgbModal);
  closeResult: WritableSignal<string> = signal('');
  page = 1;
  pageSize = 4;
  loading: boolean = false;
  error: string | null = null;
  private destroy$ = new Subject<void>();
  sidebarOpen = false;
  schools: School[] = [];
  addForm!: FormGroup;

  constructor(
    private http: HttpService,
    private _formbuilder: FormBuilder,
    private userDataService: UserDataService
  ) {


  }


  ngOnInit(): void {

    // this.GetAllAreas();
    this.GetAllSchools();
    this.intlizeForm();
  }
  GetAllSchools() {
    let areaId = Number(this.userDataService.getUserAreaId())
    this.http.get(`School/get-all-by-area-id/${areaId}`).subscribe(
      (res: any) => {
        this.mainSchools = res.schools
        this.refreshCountries();
      });
  }

  intlizeForm() {
    this.addForm = this._formbuilder.group({
      name: ['', Validators.required],
      address: ['', Validators.required],

    });
  }


  GetAllAreas() {
    this.http.get(`Area/GetAll`).subscribe(
      (res: any) => {
        this.mainSchools = res.areas
        this.refreshCountries();
      });
  }

  refreshCountries() {
    const start = (this.page - 1) * this.pageSize;
    this.schools = this.mainSchools.slice(start, start + this.pageSize);
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

  toggleStatus(point: any) {

  }

  submitAdd() {
    let payload = {
      name: this.addForm.value.name,
      address: this.addForm.value.address,
      areaId: Number(this.userDataService.getUserAreaId())
    }

    this.http.post(`school/add-new-school`, payload).subscribe(
      (res: any) => {
        this.GetAllSchools();
        this.modalService.dismissAll();

      });

  }

  submitEdit() { }

  submitDelete() { }



}
