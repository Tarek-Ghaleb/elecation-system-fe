import { Component, ElementRef, inject, OnInit, signal, TemplateRef, ViewChild, WritableSignal } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbDateStruct, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import { HttpService } from '../../../../core/services/http.service';
import { UserDataService } from '../../../../core/services/user-data.service';
import { ExportExcelDTO, GeatherPoint, SourceData, Voter } from '../../interfaces/admin.interfaces';
import { ExportToExcelService } from '../../../../core/services/export-to-excel.service';
import { FailedModalComponent } from '../../../../shared/components/failed-modal/failed-modal.component';

@Component({
  selector: 'app-elecation-source-data-page',
  templateUrl: './elecation-source-data-page.component.html',
  styleUrl: './elecation-source-data-page.component.scss'
})
export class ElecationSourceDataPageComponent implements OnInit {
  page = 1;
  pageSize = 10;
  isLoading:boolean =false;
  isGather: boolean = false;
  selectedFile: File | null = null;
  selectedFileName: string | null = null;
  uploadError: string | null = null;
  @ViewChild('uploadInput') uploadInputRef!: ElementRef<HTMLInputElement>;

  private modalService = inject(NgbModal);
  closeResult: WritableSignal<string> = signal('');
  pageTitle: string = "";
  MainData: SourceData[]=[];
  excelErrors: ExportExcelDTO[]=[];
  pageName: string="";

  searchTerm: string = '';

  data: SourceData[]=[];
  addForm!: FormGroup;
  model!: NgbDateStruct;
  showUploadBtn:boolean=false;

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
  const filtered = this.MainData.filter(v =>
    v.name?.toLowerCase().includes(term) ||
    v.nationalId?.toLowerCase().includes(term) ||
    v.schoolName?.toLowerCase().includes(term) ||
    v.schoolAddress?.toLowerCase().includes(term)
  );

  // update paged voters
  this.data = filtered.slice(0, this.pageSize);
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
this.isLoading=true
     this.http.post(`SourceData/upload`, fd).subscribe(
      (res: any) => {
        debugger;
        this.isLoading=false;
        this.excelErrors=res.excelErrors;
        if(this.excelErrors.length > 0)
          this.exportErrorData();
         
      });
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
    
this.GetAllSourceData();
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
  const maxSize = 10 * 1024 * 1024;
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


  GetAllSourceData() {
    
   this.isLoading=true;
    this.http.get(`SourceData/get-all-data`).subscribe(
      (res: any) => {
        debugger;
        this.isLoading=false;
        this.MainData = res.sourceData
        this.pageName=res.title;
        this.refreshCountries();
      });
  }

  refreshCountries() {
    const start = (this.page - 1) * this.pageSize;
    this.data = this.MainData.slice(start, start + this.pageSize);
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




