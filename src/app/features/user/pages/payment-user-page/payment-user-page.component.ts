import { Component, inject, OnInit, signal, TemplateRef, WritableSignal } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbModal, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { HttpService } from '../../../../core/services/http.service';
import { UserDataService } from '../../../../core/services/user-data.service';
import { FailedModalComponent } from '../../../../shared/components/failed-modal/failed-modal.component';
import { Voter } from '../../../admin/interfaces/admin.interfaces';
import { ChangePasswordModelComponent } from '../../../../shared/components/change-password-model/change-password-model.component';

@Component({
  selector: 'app-payment-user-page',
  templateUrl: './payment-user-page.component.html',
  styleUrl: './payment-user-page.component.scss'
})
export class PaymentUserPageComponent implements OnInit {
  page = 1;
  pageSize = 10;
  isPayment: boolean = false;
  private modalService = inject(NgbModal);
  closeResult: WritableSignal<string> = signal('');
  pageTitle: string = "";
  mainVoters: Voter[] = [];
  searchTerm: string = '';
  pageName: string = '';

  voters: Voter[] = [];
  addForm!: FormGroup;
  model!: NgbDateStruct;

  constructor(private userDataService: UserDataService, private http: HttpService, private _formbuilder: FormBuilder) {

    var loggedIdUser = this.userDataService.getUserData();
    if (loggedIdUser["IsConfirm"] == "false") {
      this.openChangePassword();
    }

    this.intlizeForm();



  }

  openChangePassword() {
    const modalRef = this.modalService.open(ChangePasswordModelComponent, {
      backdrop: 'static', // prevent closing on outside click
      keyboard: false,    // prevent closing with ESC
      centered: true,
      size: 'md'          // responsive size
    });

    modalRef.result.then(
      (result) => {
        console.log('Password changed:', result);
      },
      (reason) => {
        console.log('Modal dismissed:', reason);
      }
    );
  }

  onSearchChange() {
    const term = this.searchTerm.trim().toLowerCase();

    if (!term) {
      // no search: show all
      this.refreshCountries();
      return;
    }
  }


  ngOnInit(): void {
    debugger;
    if (this.userDataService.getUserRoles().includes("Payment")) {
      this.isPayment = true;
      if (this.userDataService.getUserRoles().includes("Super")) {
        this.pageTitle = "مدير  نقطة الصرف";
        this.GetAllVoterByOption(this.userDataService.getUserData()['PaymentPointId'], 3);
      }
      else {
        this.pageTitle = "مسئول  نقطة الصرف"

      }

    }

  }


  GetAllVoterByOption(operationId: number, operationType: number) {
    debugger;
    let payload = {
      operationType: operationType,
      operationId: Number(operationId)
    };
    this.http.post(`Voter/get-all-by-Option`, payload).subscribe(
      (res: any) => {
        this.mainVoters = res.voters
        this.pageName = res.title;
        this.refreshCountries();
      });
  }

  refreshCountries() {
    const start = (this.page - 1) * this.pageSize;
    this.voters = this.mainVoters.slice(start, start + this.pageSize);
  }


  onPageSizeChange(newSize: number) {
    this.pageSize = newSize;
    this.page = 1;
    this.refreshCountries();
  }

  intlizeForm() {
    this.addForm = this._formbuilder.group({
      nationalId: ['', Validators.required],


    });
  }

  onAdd(): void {
    console.log(`Add point`);
  }

  onEdit(pointId: number): void {
    console.log(`Edit point with ID: ${pointId}`);
  }

  onDelete(pointId: number): void {
    console.log(`Delete point with ID: ${pointId}`);
  }

  submitEdit() { }

  submitDelete() { }

  submitAdd() {
    debugger;
    let payload = {
      voterNationalId: this.addForm.value.nationalId,
      status: 4

    }

    this.http.put(`Voter/update-voter-trip`, payload).subscribe(
      (res: any) => {

        if (res?.code == '200' && res?.isSuccess) {

          this.GetAllVoterByOption(this.userDataService.getUserData()['PaymentId'], 3)
          this.refreshCountries();


          this.modalService.dismissAll();
        } else {
          const modalRef = this.modalService.open(FailedModalComponent, {
            modalDialogClass: 'filter-modal',
            backdrop: false,
          });
          modalRef.componentInstance.failedMsg = res?.message;
        }

      });

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
}

