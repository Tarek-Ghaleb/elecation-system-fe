import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes } from '@angular/router';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '../../shared/shared.module';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { UserNavbarComponent } from './shared/components/user-navbar/user-navbar.component';
import { AuthGuard } from '../../core/guards/auth-guard';
import { RoleGuard } from '../../core/guards/role-guard';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import{PaymentUserPageComponent}from '../user/pages/payment-user-page/payment-user-page.component';
import{SchoolUserPageComponent}from '../user/pages/school-user-page/school-user-page.component';


const routes: Routes = [
  {
    path: '',
    component: HomePageComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { allowedRoles: ['GatherSupervisor','GatherAgent'] },
  },
  {
    path: 'schoolUser',
    component: SchoolUserPageComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { allowedRoles: ['SchoolSupervisor','SchoolAgent'] },
  },
  {
    path: 'paymentUser',
    component: PaymentUserPageComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { allowedRoles: ['PaymentSupervisor','PaymentAgent'] },
  },
];

@NgModule({
  declarations: [HomePageComponent, UserNavbarComponent,SchoolUserPageComponent,PaymentUserPageComponent],
  imports: [
    CommonModule,
    RouterModule,
    RouterModule.forChild(routes),
    TranslateModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    NgbPaginationModule
  ],
})
export class UserModule {}
