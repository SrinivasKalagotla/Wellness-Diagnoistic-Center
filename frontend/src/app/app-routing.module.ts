import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddBillsComponent } from './add-bills/add-bills.component';
import { ViewBillsComponent } from './view-bills/view-bills.component';
import { AuthComponent } from './auth/auth.component';
import { AuthGuard } from './auth.guard';
import { WelcomeComponent } from './welcome/welcome.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: WelcomeComponent },
  { path: 'auth', component: AuthComponent },
  { path: 'add-bill', component: AddBillsComponent, canActivate: [AuthGuard] },
  { path: 'view-bills', component: ViewBillsComponent, canActivate: [AuthGuard] },
  {path: 'view-bills/:patientName', component: ViewBillsComponent}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }


