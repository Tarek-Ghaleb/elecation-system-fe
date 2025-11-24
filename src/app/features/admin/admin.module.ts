import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes } from '@angular/router';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';

import { SharedModule } from '../../shared/shared.module';
import { AdminHomePage } from './pages/admin-home-page/admin-home-page';
import { SchoolsPageComponent } from './pages/schools-page/schools-page.component';
import { PayPointsPageComponent } from './pages/pay-points-page/pay-points-page.component';
import { MainPointsPageComponent } from './pages/main-points-page/main-points-page.component';
import { UsersListPageComponent } from './pages/users-list-page/users-list-page.component';
import { RegionPageComponent } from './pages/region-page/region-page.component';
import { AuthGuard } from '../../core/guards/auth-guard';
import { RoleGuard } from '../../core/guards/role-guard';
import { ElecationSourceDataPageComponent } from './pages/elecation-source-data-page/elecation-source-data-page.component';
import { GatherSourceDataPageComponent } from './pages/gather-source-data-page/gather-source-data-page.component';


const routes: Routes = [
  {
    path: 'home',
    component: AdminHomePage,
     canActivate: [AuthGuard, RoleGuard],
        data: { allowedRoles: ['Admin', 'OperationAdmin'] },
  },
  {
    path: 'main-points',
    component: MainPointsPageComponent,
     canActivate: [AuthGuard, RoleGuard],
    data: { allowedRoles: ['OperationAdmin'] },
  },
  {
    path: 'pay-points',
    component: PayPointsPageComponent,
     canActivate: [AuthGuard, RoleGuard],
    data: { allowedRoles: ['OperationAdmin'] },
  },
  {
    path: 'source-data',
    component: ElecationSourceDataPageComponent,
     canActivate: [AuthGuard, RoleGuard],
    data: { allowedRoles: ['OperationAdmin'] },
  },
   {
    path: 'active-gather-data',
    component: GatherSourceDataPageComponent,
     canActivate: [AuthGuard, RoleGuard],
    data: { allowedRoles: ['OperationAdmin'] },
  },
  {
    path: 'schools',
    component: SchoolsPageComponent,
     canActivate: [AuthGuard, RoleGuard],
    data: { allowedRoles: ['OperationAdmin'] },
  },
   {
    path: 'areas',
    component: RegionPageComponent,
     canActivate: [AuthGuard, RoleGuard],
    data: { allowedRoles: ['Admin'] },
  },
  {
    path: 'users-list',
    component: UsersListPageComponent,
     canActivate: [AuthGuard, RoleGuard],
    data: { allowedRoles: ['Admin', 'OperationAdmin'] },
  },
 
];

@NgModule({
  declarations: [AdminHomePage, SchoolsPageComponent, PayPointsPageComponent, MainPointsPageComponent, UsersListPageComponent,RegionPageComponent,ElecationSourceDataPageComponent,GatherSourceDataPageComponent],
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
export class AdminModule {}
