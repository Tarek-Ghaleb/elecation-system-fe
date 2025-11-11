import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { LoaderComponent } from './components/loader/loader.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AdminSidebarComponent } from '../features/admin/shared/components/admin-sidebar/admin-sidebar.component';
import { UnauthorizedPageComponent } from './components/unauthorized-page/unauthorized-page.component';
import { FailedModalComponent } from './components/failed-modal/failed-modal.component';
import { SuccessModalComponent } from './components/success-modal/success-modal.component';

@NgModule({
  declarations: [
    LoaderComponent,
    AdminSidebarComponent,
    UnauthorizedPageComponent,
    FailedModalComponent,
    SuccessModalComponent,
    LoaderComponent,
    UnauthorizedPageComponent
  ],
  imports: [RouterModule, TranslateModule, CommonModule],
  exports: [
    LoaderComponent,
    RouterModule,
    AdminSidebarComponent,
  ],
  providers: [],
  bootstrap: [],
})
export class SharedModule {}
