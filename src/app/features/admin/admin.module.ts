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

const routes: Routes = [
  {
    path: 'home',
    component: AdminHomePage,
  },
  {
    path: 'main-points',
    component: MainPointsPageComponent,
  },
  {
    path: 'pay-points',
    component: PayPointsPageComponent,
  },
  {
    path: 'schools',
    component: SchoolsPageComponent,
  },
   {
    path: 'areas',
    component: RegionPageComponent,
  },
  {
    path: 'users-list',
    component: UsersListPageComponent,
  },
 
];

@NgModule({
  declarations: [AdminHomePage, SchoolsPageComponent, PayPointsPageComponent, MainPointsPageComponent, UsersListPageComponent,RegionPageComponent],
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
