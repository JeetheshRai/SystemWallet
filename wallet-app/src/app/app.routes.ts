import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: 'transactions', loadComponent: () => import('./transaction/transaction.component').then(m => m.TransactionComponent) },
    { path: 'wallet-setup', loadComponent: () => import('./wallet-setup/wallet-setup.component').then(m => m.WalletSetupComponent) },
    { path: '', redirectTo: '/wallet-setup', pathMatch: 'full' },
    { path: '**', redirectTo: '/wallet-setup' }
  ];
