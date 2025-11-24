import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { AuthHttpService } from '../../../features/auth/pages/services/auth-http.service';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { UserDataService } from '../../../core/services/user-data.service';
import { FailedModalComponent } from '../failed-modal/failed-modal.component';
import { HttpService } from '../../../core/services/http.service';

@Component({
  selector: 'app-change-password-model',

  templateUrl: './change-password-model.component.html',
  styleUrl: './change-password-model.component.scss'
})
export class ChangePasswordModelComponent {
  lang: any = localStorage.getItem('language');
  loginForm!: FormGroup;
  passwordPattern =
    '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z0-9!@#$%^&*(),.?":{}|<>]{8,}$';
  submitLoader: any = false;

  constructor(
    public formbuilder: FormBuilder,
    private http: HttpService,
    private modalService: NgbModal,
    private router: Router,
    private translate: TranslateService,
    private userData: UserDataService
  ) { }

  ngOnInit() {
    debugger;
    this.buildLoginFormGroup();
  }

  changeLanguage(lang: any) {
    switch (lang) {
      case 'en':
        this.translate.use('en');
        localStorage.setItem('language', 'en');
        break;
      case 'ar':
        this.translate.use('ar');
        localStorage.setItem('language', 'ar');
        break;

      default:
        break;
    }
    location.reload();
  }

  buildLoginFormGroup() {
    this.loginForm = this.formbuilder.group({
      newPassword: [null, [Validators.required, Validators.pattern(this.passwordPattern)]],
      confirmPassword: [
        null,
        [Validators.required, Validators.pattern(this.passwordPattern)],
      ],
    });
  }

  get loginFormControls() {
    return this.loginForm.controls;
  }

  submitLoginForm() {
debugger;
    this.submitLoader = true;
    let model = {
      newPassword: this.loginForm.controls['newPassword'].value,
      confirmPassword: this.loginForm.controls['confirmPassword'].value,
    };
    this.http.post(`Account/update-password`, model).subscribe(
      (res:any) => {
        this.submitLoader = false;
        debugger;   
        if (res?.code == '200' && res?.isSuccess) {
          localStorage.setItem('User', res?.token);
          if (this.userData.getUserRoles()?.includes('Admin'))
            this.router.navigate(['admin/home']);
          else if (this.userData.getUserRoles()?.includes('Gather'))
            this.router.navigate(['user']);
          else if (this.userData.getUserRoles()?.includes('School'))
            this.router.navigate(['user/schoolUser']);
          else if (this.userData.getUserRoles()?.includes('Payment'))
            this.router.navigate(['user/paymentUser']);

        } else {
          const modalRef = this.modalService.open(FailedModalComponent, {
            modalDialogClass: 'filter-modal',
            backdrop: false,
          });
          modalRef.componentInstance.failedMsg = res?.message;
        }
      },
      (err:any) => {
        this.submitLoader = false;
        const modalRef = this.modalService.open(FailedModalComponent, {
          modalDialogClass: 'filter-modal',
          backdrop: false,
        });
        modalRef.componentInstance.failedMsg =
          this.lang == 'en' ? 'something went wrong' : 'حدث خطأ ما';
      }
    );
  }
}
