import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { LoginPageComponent } from './features/auth/pages/login-page/login-page.component';
import { UnauthorizedPageComponent } from './shared/components/unauthorized-page/unauthorized-page.component';
import { AuthGuard } from './core/guards/auth-guard';
import { RoleGuard } from './core/guards/role-guard';
import { AdminHomePage } from './features/admin/pages/admin-home-page/admin-home-page';

export const routes: Routes = [
  {
    path: 'admin',
    canActivate: [AuthGuard, RoleGuard],
    data: { allowedRoles: ['Admin', 'OperationAdmin'] },
    loadChildren: () =>
      import('./features/admin/admin.module').then((m) => m.AdminModule),
  },
   {
    path: 'user',
    canActivate: [AuthGuard, RoleGuard],
    data: { allowedRoles: ['GatherSupervisor','GatherAgent','SchoolSupervisor','SchoolAgent','PaymentSupervisor','PaymentAgent'] },
    loadChildren: () =>
      import('./features/user/user.module').then((m) => m.UserModule),
  },
  {
    path: '',
    component: LoginPageComponent,
    loadChildren: () =>
      import('./features/auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'unauthorized',
    component: UnauthorizedPageComponent,
  },
  { path: '**', redirectTo: 'unauthorized', pathMatch: 'full' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
