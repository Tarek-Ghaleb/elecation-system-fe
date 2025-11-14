import { Component, inject, OnInit, signal, TemplateRef, WritableSignal } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbModal, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { HttpService } from '../../../../core/services/http.service';
import { UserDataService } from '../../../../core/services/user-data.service';
import { FailedModalComponent } from '../../../../shared/components/failed-modal/failed-modal.component';

@Component({
  selector: 'app-school-user-page',
  templateUrl: './school-user-page.component.html',
  styleUrl: './school-user-page.component.scss'
})
export class SchoolUserPageComponent implements OnInit {
  page = 1;
  pageSize = 10;
  isSchool: boolean = false;
  private modalService = inject(NgbModal);
  closeResult: WritableSignal<string> = signal('');
  pageTitle: string = "";
  mainVoters: any;

  voters: any;
  addForm!: FormGroup;
  model!: NgbDateStruct;

  constructor(private userDataService: UserDataService, private http: HttpService, private _formbuilder: FormBuilder) {


    this.intlizeForm();


  }
  ngOnInit(): void {
    debugger;
    if (this.userDataService.getUserRoles().includes("School")) {
      this.isSchool = true;
      if (this.userDataService.getUserRoles().includes("Super")) {
        this.pageTitle = "مدير مدرسة انتخاب";
        this.GetAllVoterByOption(this.userDataService.getUserData()['SchoolId'], 2);
      }
      else {
        this.pageTitle = "مسئول مدرسة انتخاب"

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
      status:3

    }

    this.http.put(`Voter/update-voter-trip`, payload).subscribe(
      (res: any) => {
     
        if (res?.code == '200' && res?.isSuccess) {
           if (this.userDataService.getUserRoles().includes("Super")) {
          this.GetAllVoterByOption(this.userDataService.getUserData()['SchoolId'], 2)
          this.refreshCountries();

        }
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
