import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./components/dashboard/dashboard.component').then(
        (m) => m.DashboardComponent
      ),
  },
  {
    path: 'investment-form',
    loadComponent: () =>
      import('./components/investmentForm/investment-form.component').then(
        (m) => m.InvestmentFormComponent
      ),
  },
  {
    path: '',
    redirectTo: '/investment-form',
    pathMatch: 'full'
  }
];
