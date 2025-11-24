import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import {
  NgLabelTemplateDirective,
  NgOptionTemplateDirective,
  NgSelectComponent,
} from '@ng-select/ng-select';
import { AuthGuard } from '../../core/guards/auth-guard';
import { RoleGuard } from '../../core/guards/role-guard';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { AppConfigService } from '../../core/services/app-config.service';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { ChangePasswordModelComponent } from '../../shared/components/change-password-model/change-password-model.component';

const routes: Routes = [
  {
    path: '',
    component: LoginPageComponent,
  },
];

@NgModule({
  declarations: [LoginPageComponent, ChangePasswordModelComponent],
  imports: [
    CommonModule,
    TranslateModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    NgLabelTemplateDirective,
    NgOptionTemplateDirective,
    NgSelectComponent,
    RouterModule.forChild(routes),
  ],
})
export class AuthModule { }
