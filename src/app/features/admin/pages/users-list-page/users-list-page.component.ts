import { Component, inject, OnInit, signal, TemplateRef, WritableSignal } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import { HttpService } from '../../../../core/services/http.service';
import { School, Regions, User, Role, PaymentPoint, GeatherPoint } from '../../interfaces/admin.interfaces';
import { UserDataService } from '../../../../core/services/user-data.service';

@Component({
  selector: 'app-users-list-page',
  templateUrl: './users-list-page.component.html',
  styleUrl: './users-list-page.component.scss'
})
export class UsersListPageComponent implements OnInit {
  mainUsers: User[] = [];
  Roles: Role[] = [];
  selectedRole: Role | undefined;

  mainRegions: Regions[] = [];
  selectedArea: Regions | undefined;


  Schools: School[] = [];
  selectedSchool: School | undefined;

  paymenPoints: PaymentPoint[] = [];
  selectedpayment: PaymentPoint | undefined;

  gatherPoints: GeatherPoint[] = [];
  selectedGatherPoint: GeatherPoint | undefined;



  private modalService = inject(NgbModal);
  closeResult: WritableSignal<string> = signal('');
  page = 1;
  pageSize = 4;
  loading: boolean = false;
  error: string | null = null;
  private destroy$ = new Subject<void>();
  sidebarOpen = false;
  users: User[] = [];
  addForm!: FormGroup;
  loggedInUserId: number = 0;
  isAdmin: boolean = false;
  isGather: boolean = false;
  isPayment: boolean = false;
  isSchool: boolean = false;

  constructor(
    private http: HttpService,
    private _formbuilder: FormBuilder,
    private userDataService: UserDataService
  ) {
    this.intlizeForm();

    if (this.userDataService.getUserRoles() == "Admin") {
      this.isAdmin = true;
      this.enableGatherValidation(false);
      this.enablePaymentValidation(false);
      this.enableSchoolValidation(false);

      this.addForm.get('role')?.clearValidators();
      this.addForm.get('role')?.updateValueAndValidity();

      this.GetAllAreas();

    }
    else {
      this.isAdmin = false;
      this.addForm.get('areaId')?.clearValidators();
      this.addForm.get('areaId')?.updateValueAndValidity();

      this.getAllRoles();


    }
  }

  enableSchoolValidation(enable: boolean) {
    if (enable) {
      this.addForm.get('schoolId')?.setValidators([Validators.required]);
      this.addForm.get('schoolId')?.updateValueAndValidity();
    }
    else {
      this.addForm.get('schoolId')?.clearValidators();
      this.addForm.get('schoolId')?.updateValueAndValidity();
      this.addForm.get('schoolId')?.setValue(null);
      this.selectedSchool=undefined;
    }
  }

  enableGatherValidation(enable : boolean) {

    if (enable) {
      this.addForm.get('GatherPointId')?.setValidators([Validators.required]);
      this.addForm.get('GatherPointId')?.updateValueAndValidity();
    }
    else{
    this.addForm.get('GatherPointId')?.clearValidators();
    this.addForm.get('GatherPointId')?.updateValueAndValidity();
    this.addForm.get('GatherPointId')?.setValue(null);
    this.selectedGatherPoint=undefined
    }
  }

  enablePaymentValidation(enable : boolean) {

    if (enable) {
      this.addForm.get('paymedPointId')?.setValidators([Validators.required]);
      this.addForm.get('paymedPointId')?.updateValueAndValidity();
    }
    else{
    this.addForm.get('paymedPointId')?.clearValidators();
    this.addForm.get('paymedPointId')?.updateValueAndValidity();
    this.addForm.get('paymedPointId')?.setValue(null);
    this.selectedpayment=undefined;

    
    }
  }
  getAllRoles() {
    this.http.get(`Roles/getAllRoles`).subscribe(
      (res: any) => {
        this.Roles = res.roles
        this.refreshCountries();
      });
  }


  ngOnInit(): void {

    this.loggedInUserId = Number(this.userDataService.getUserId());

    this.GetAllUsersByUserId(this.loggedInUserId);
  }

  onSelectArea(area: any) {
    debugger;
    this.selectedArea = area;
    this.addForm.get('areaId')?.setValue(area.id);
  }

  onSelectPoint(point: any) {
    debugger;
    this.selectedGatherPoint = point;
    this.addForm.get('GatherPointId')?.setValue(point.id);
  }

  onSelectSchool(school: any) {
    debugger;
    this.selectedSchool = school;
    this.addForm.get('schoolId')?.setValue(school.id);
  }

  onSelectPaymen(payment: any) {
    debugger;
    this.selectedpayment = payment;
    this.addForm.get('paymedPointId')?.setValue(this.selectedpayment?.id);
  }

  onSelectRole(role: any) {
    this.selectedRole = role;
    this.addForm.get('role')?.setValue(role.id);
    if (role.roleName.includes("Gather"))
      this.getGatherPointsByAreaId();
    else if (role.roleName.includes("School"))
      this.getSchoolByAreaId();
    else if (role.roleName.includes("Payment"))
      this.getPaymentPointsByAreaId();
  }
  getPaymentPointsByAreaId() {

        this.isGather = false;
    this.isPayment = true;
    this.isSchool = false;
    this.enableGatherValidation(false)
    this.enablePaymentValidation(true);
    this.enableSchoolValidation(false);
    let id = Number(this.userDataService.getUserAreaId());
    this.http.get(`PaymentPoint/get-all-by-area-id/${id}`).subscribe(
      (res: any) => {
        this.paymenPoints = res.paymentPoints
      });
  }
  getSchoolByAreaId() {

        this.isGather = false;
    this.isPayment = false;
    this.isSchool = true;
    this.enableGatherValidation(false)
    this.enablePaymentValidation(false);
    this.enableSchoolValidation(true);

    let areaId = Number(this.userDataService.getUserAreaId());
    this.http.get(`School/get-all-by-area-id/${areaId}`).subscribe(
      (res: any) => {
        this.Schools = res.schools
      });
  }
  getGatherPointsByAreaId() {
    this.isGather = true;
    this.isPayment = false;
    this.isSchool = false;
    this.enableGatherValidation(true)
    this.enablePaymentValidation(false);
    this.enableSchoolValidation(false);

    let id = Number(this.userDataService.getUserAreaId());
    this.http.get(`GatherPoint/get-all-by-area-id/${id}`).subscribe(
      (res: any) => {
        this.gatherPoints = res.gatherPoints
      });
  }
  GetAllUsersByUserId(id: number) {
    this.http.get(`Users/get-users-by-user-id/${id}`).subscribe(
      (res: any) => {
        this.mainUsers = res.users
        this.refreshCountries();
      });
  }

  intlizeForm() {
    this.addForm = this._formbuilder.group({
      name: ['', Validators.required],
      userName: ['', Validators.required],
      areaId: ['', Validators.required],
      role: ['', Validators.required],

      schoolId: ['', Validators.required],
      paymedPointId: ['', Validators.required],
      GatherPointId: ['', Validators.required]
    });
  }


  GetAllAreas() {
    this.http.get(`Area/GetAll`).subscribe(
      (res: any) => {
        this.mainRegions = res.areas
      });
  }

  refreshCountries() {
    const start = (this.page - 1) * this.pageSize;
    this.users = this.mainUsers.slice(start, start + this.pageSize);
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
    let roleId:number=0;
    if(this.isAdmin){
      roleId=2

    }

    let payload = {
      name: this.addForm.value.name,
      userName: this.addForm.value.userName,
      roleId: this.isAdmin?roleId: this.addForm.value.role,
      areaId: !this.isAdmin? Number(this.userDataService.getUserAreaId()):this.selectedArea?.id,
      createdUserId: this.userDataService.getUserId(),
      schoolId:this.selectedSchool!=null && this.selectedSchool!=undefined?Number(this.addForm.value.schoolId) : null,
      paymentPointId:this.selectedpayment!=null && this.selectedpayment!=undefined?Number(this.addForm.value.paymedPointId) : null,
      GatherPointId:this.selectedGatherPoint!=null && this.selectedGatherPoint!=undefined?Number(this.addForm.value.GatherPointId) : null,


    };

    this.http.post(`Account/register`, payload).subscribe(
      (res: any) => {
        this.GetAllUsersByUserId(this.loggedInUserId);
        this.modalService.dismissAll();

      });

  }

  submitEdit() { }

  submitDelete() { }



}
