import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes } from '@angular/router';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '../../shared/shared.module';
import { AdminHomePage } from './pages/admin-home-page/admin-home-page';
import { SchoolsPageComponent } from './pages/schools-page/schools-page.component';
import { PayPointsPageComponent } from './pages/pay-points-page/pay-points-page.component';
import { MainPointsPageComponent } from './pages/main-points-page/main-points-page.component';
import { UsersListPageComponent } from './pages/users-list-page/users-list-page.component';

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
    path: 'users-list',
    component: UsersListPageComponent,
  },
];

@NgModule({
  declarations: [AdminHomePage, SchoolsPageComponent, PayPointsPageComponent, MainPointsPageComponent, UsersListPageComponent],
  imports: [
    CommonModule,
    RouterModule,
    RouterModule.forChild(routes),
    TranslateModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
  ],
})
export class AdminModule {}
