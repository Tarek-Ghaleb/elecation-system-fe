import { Component, inject, OnInit, signal, TemplateRef, WritableSignal } from '@angular/core';
import { PaymentPoint, School } from '../../interfaces/admin.interfaces';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpService } from '../../../../core/services/http.service';
import { UserDataService } from '../../../../core/services/user-data.service';

@Component({
  selector: 'app-pay-points-page',
  templateUrl: './pay-points-page.component.html',
  styleUrl: './pay-points-page.component.scss'
})
export class PayPointsPageComponent implements OnInit {
  mainPaymentPoints: PaymentPoint[] = [];


  private modalService = inject(NgbModal);
  closeResult: WritableSignal<string> = signal('');
  page = 1;
  pageSize = 4;
  loading: boolean = false;
  error: string | null = null;
  private destroy$ = new Subject<void>();
  sidebarOpen = false;
  paymentPoints: PaymentPoint[] = [];
  addForm!: FormGroup;

  constructor(
    private http: HttpService,
    private _formbuilder: FormBuilder,
    private userDataService:UserDataService
  ) {


  }


  ngOnInit(): void {

    // this.GetAllAreas();
    this.GetAllPaymentPoint();
    this.intlizeForm();
  }
  GetAllPaymentPoint() {
    this.http.get(`PaymentPoint/get-all-by-area-id/${Number(this.userDataService.getUserAreaId())}`).subscribe(
      (res: any) => {
        debugger;
        this.mainPaymentPoints = res.paymentPoints
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
    this.paymentPoints = this.mainPaymentPoints.slice(start, start + this.pageSize);
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
      areaId:Number( this.userDataService.getUserAreaId())
    };

    this.http.post(`PaymentPoint/add`, payload).subscribe(
      (res: any) => {
        this.GetAllPaymentPoint();
        this.modalService.dismissAll();

      });

  }

  submitEdit() { }

  submitDelete() { }



}
