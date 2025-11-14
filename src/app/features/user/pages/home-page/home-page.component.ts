import { Component, ElementRef, inject, OnInit, signal, TemplateRef, ViewChild, WritableSignal } from '@angular/core';
import { UserDataService } from '../../../../core/services/user-data.service';
import { HttpService } from '../../../../core/services/http.service';
import { NgbDateStruct, NgbModal, NgbDatepickerModule, NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FailedModalComponent } from '../../../../shared/components/failed-modal/failed-modal.component';
import { ExportExcelDTO, Voter } from '../../../admin/interfaces/admin.interfaces';
import { ExportToExcelService } from '../../../../core/services/export-to-excel.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})
export class HomePageComponent implements OnInit {
  page = 1;
  pageSize = 10;
  isGather: boolean = false;
  selectedFile: File | null = null;
  selectedFileName: string | null = null;
  uploadError: string | null = null;
  @ViewChild('uploadInput') uploadInputRef!: ElementRef<HTMLInputElement>;

  private modalService = inject(NgbModal);
  closeResult: WritableSignal<string> = signal('');
  pageTitle: string = "";
  mainVoters: Voter[]=[];
  excelErrors: ExportExcelDTO[]=[];

  searchTerm: string = '';

  voters: Voter[]=[];
  addForm!: FormGroup;
  model!: NgbDateStruct;

  constructor(private userDataService: UserDataService, private http: HttpService, private _formbuilder: FormBuilder,private excelService:ExportToExcelService) {


    this.intlizeForm();


  }

  onSearchChange() {
  const term = this.searchTerm.trim().toLowerCase();

  if (!term) {
    // no search: show all
    this.refreshCountries();
    return;
  }

  // filter mainVoters
  const filtered = this.mainVoters.filter(v =>
    v.fullName?.toLowerCase().includes(term) ||
    v.nationalId?.toLowerCase().includes(term) ||
    v.phone?.toLowerCase().includes(term) ||
    v.address?.toLowerCase().includes(term)
  );

  // update paged voters
  this.voters = filtered.slice(0, this.pageSize);
  this.page = 1; // reset page to 1
}

  
async submitUpload(modalRef?: any) {
  if (!this.selectedFile) {
    this.uploadError = 'لم يتم اختيار ملف.';
    return;
  }

  try {
    // Example using FormData
    debugger;
    const fd = new FormData();
    fd.append('file', this.selectedFile, this.selectedFile.name);

     this.http.post(`Voter/upload-voter`, fd).subscribe(
      (res: any) => {
        debugger;
        this.excelErrors=res.excelErrors;
        if(this.excelErrors.length > 0)
          this.exportErrorData();
         this.GetAllVoterByOption(this.userDataService.getUserData()['GatherPointId'], 1);
      });

    // Replace the following with your actual upload method:
    // await this.myService.uploadExcel(fd).toPromise();

    // For now just simulate success:
    // await new Promise(res => setTimeout(res, 800));

    // On success:
    this.selectedFile = null;
    this.selectedFileName = null;
    this.uploadError = null;

    // close modal if passed
    if (modalRef && typeof modalRef.close === 'function') modalRef.close();

    // optionally: refresh data / show toast
    // this.toastService.success('تم رفع الملف بنجاح');
  } catch (err: any) {
    console.error(err);
    this.uploadError = 'حدث خطأ أثناء الرفع. حاول مرة أخرى.';
  }
}
  exportErrorData() {
     const exportData = this.excelErrors.map(trip => ({
      'رقم الصف': trip.rowNumber,
      'الخطأ عبارة عن': trip.errorMessage,

      

    }));

    

    // Export to Excel
    this.excelService.exportToExcel(exportData, 'اخطاء الفايل المرفوع');
  }

  triggerFileInput() {
    this.uploadError = null;
    if (this.uploadInputRef && this.uploadInputRef.nativeElement) {
      this.uploadInputRef.nativeElement.value = ''; // reset so same file can be re-selected
      this.uploadInputRef.nativeElement.click();
    }
  }


  ngOnInit(): void {
    if (this.userDataService.getUserRoles().includes("Gather")) {
      this.isGather = true;
      if (this.userDataService.getUserRoles().includes("Super")) {
        this.pageTitle = "مدير نقطة حشد";
        this.GetAllVoterByOption(this.userDataService.getUserData()['GatherPointId'], 1);
      }
      else {
        this.pageTitle = "مسئول حشد"

      }

    }

  }

  onFileSelected(event: Event) {
  this.uploadError = null;
  const input = event.target as HTMLInputElement;
  const file = input.files && input.files[0] ? input.files[0] : null;

  if (!file) {
    this.selectedFile = null;
    this.selectedFileName = null;
    return;
  }

  // Validate extension and MIME (best-effort)
  const allowedExt = ['xlsx', 'xls'];
  const name = file.name || '';
  const ext = name.split('.').pop()?.toLowerCase() || '';
  const allowedMime = [
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'application/vnd.ms-excel'
  ];

  if (!allowedExt.includes(ext) && !allowedMime.includes(file.type)) {
    this.uploadError = 'الملف غير مدعوم. الرجاء رفع ملف Excel (.xlsx أو .xls).';
    this.selectedFile = null;
    this.selectedFileName = null;
    return;
  }

  // optionally: size limit, e.g., 5MB
  const maxSize = 5 * 1024 * 1024;
  if (file.size > maxSize) {
    this.uploadError = 'حجم الملف كبير جدًا. الحد الأقصى 5 ميجابايت.';
    this.selectedFile = null;
    this.selectedFileName = null;
    return;
  }

  this.selectedFile = file;
  this.selectedFileName = file.name;
}

clearFile() {
  this.selectedFile = null;
  this.selectedFileName = null;
  this.uploadError = null;
  if (this.uploadInputRef && this.uploadInputRef.nativeElement) {
    this.uploadInputRef.nativeElement.value = '';
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
      fullname: ['', Validators.required],
      nationalId: ['', Validators.required],
      birthDate: ['', Validators.required],
      phone: ['', Validators.required],
      address: [''],




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
      fullName: this.addForm.value.fullname,
      nationalId: this.addForm.value.nationalId,
      phone: this.addForm.value.phone,
      birthDate: this.addForm.value.birthDate,
      address: this.addForm.value.address

    }

    this.http.post(`Voter/add-new-voter`, payload).subscribe(
      (res: any) => {
        // this.GetAllGatherPoints(Number(this.userDataService.getUserAreaId()))
        if (res?.code == '200' && res?.isSuccess) {
          if (this.userDataService.getUserRoles().includes("Super")) {
            this.GetAllVoterByOption(this.userDataService.getUserData()['GatherPointId'], 1)
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




