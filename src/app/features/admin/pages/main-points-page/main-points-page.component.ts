import { Component, inject, OnInit, signal, TemplateRef, WritableSignal } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GeatherPoint, MainPoints, PaymentPoint } from '../../interfaces/admin.interfaces';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { HttpService } from '../../../../core/services/http.service';
import { UserDataService } from '../../../../core/services/user-data.service';

@Component({
  selector: 'app-main-points-page',
  templateUrl: './main-points-page.component.html',
  styleUrl: './main-points-page.component.scss'
})
export class MainPointsPageComponent implements OnInit {
  mainPoints: GeatherPoint[] = [];


  private modalService = inject(NgbModal);
  closeResult: WritableSignal<string> = signal('');
  page = 1;
  pageSize = 4;
  loading: boolean = false;
  error: string | null = null;
  private destroy$ = new Subject<void>();
  sidebarOpen = false;
  points: GeatherPoint[] = [];
  addForm!: FormGroup;
  areaId: number | undefined

  constructor(
    private http: HttpService,
    private _formbuilder: FormBuilder,
    private userDataService: UserDataService
  ) {


  }


  ngOnInit(): void {

    // this.GetAllAreas();
    this.areaId = Number(this.userDataService.getUserAreaId())
    this.GetAllGatherPoints(Number(this.userDataService.getUserAreaId()));
    this.intlizeForm();
  }
  GetAllGatherPoints(areaId: number) {
    this.http.get(`GatherPoint/get-all-by-area-id/${areaId}`).subscribe(
      (res: any) => {
        this.mainPoints = res.gatherPoints
        this.refreshCountries();
      });
  }

  intlizeForm() {
    this.addForm = this._formbuilder.group({
      name: ['', Validators.required],

    });
  }




  refreshCountries() {
    const start = (this.page - 1) * this.pageSize;
    this.points = this.mainPoints.slice(start, start + this.pageSize);
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
    debugger;
   
    let payload = {
      name: this.addForm.value.name,
      areaId:Number(this.userDataService.getUserAreaId())
    }

    this.http.post(`GatherPoint/add`, payload).subscribe(
      (res: any) => {
        this.GetAllGatherPoints(Number(this.userDataService.getUserAreaId()));
        this.modalService.dismissAll();

      });

  }

  submitEdit() { }

  submitDelete() { }



}
