import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './components/home/home.component';
import { authGuard } from './services/guard/auth.guard';
import { ServiceOrderDetailsComponent } from './components/service-order-details/service-order-details.component';

export const routes: Routes = [
  { path: 'home', component: HomeComponent, canActivate: [authGuard] },
  { path: 'details/:serviceOrderCode', component: ServiceOrderDetailsComponent, canActivate: [authGuard] },
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
];
