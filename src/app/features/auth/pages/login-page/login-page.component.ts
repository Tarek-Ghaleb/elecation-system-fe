import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthHttpService } from '../services/auth-http.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { FailedModalComponent } from '../../../../shared/components/failed-modal/failed-modal.component';
import { TranslateService } from '@ngx-translate/core';
import { UserDataService } from '../../../../core/services/user-data.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss',
})
export class LoginPageComponent {
  lang: any = localStorage.getItem('language');
  loginForm!: FormGroup;
  passwordPattern =
    '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z0-9!@#$%^&*(),.?":{}|<>]{8,}$';
  submitLoader: any = false;

  constructor(
    public formbuilder: FormBuilder,
    private http: AuthHttpService,
    private modalService: NgbModal,
    private router: Router,
    private translate: TranslateService,
    private userData: UserDataService
  ) {}

  ngOnInit() {
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
      userName: [null, [Validators.required]],
      password: [
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
      userName: this.loginForm.controls['userName'].value,
      password: this.loginForm.controls['password'].value,
    };
    this.http.submitLoginAPI(model).subscribe(
      (res) => {
        this.submitLoader = false;
        debugger;
        if (res?.code == '200' && res?.isSuccess) {
          localStorage.setItem('User', res?.token);
          if(this.userData.getUserRoles()?.includes('Admin'))
            this.router.navigate(['admin/home'])
          !this.userData.getUserRoles()?.includes('SystemAdmin') &&
          !this.userData.getUserRoles()?.includes('Sales')
            ? this.router.navigateByUrl('insurance-management/list', {
                state: { lob: 1 },
              })
            : this.router.navigate(['clients/list']);
        } else {
          const modalRef = this.modalService.open(FailedModalComponent, {
            modalDialogClass: 'filter-modal',
            backdrop: false,
          });
          modalRef.componentInstance.failedMsg = res?.errorMessage;
        }
      },
      (err) => {
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
