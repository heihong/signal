import { Routes } from '@angular/router';
import { ExpenseListComponent } from './expenses/expense-list/expense-list.component';
import { ExpenseAddComponent } from './expenses/expense-add/expense-add.component';
import { ExpenseEditComponent } from './expenses/expense-edit/expense-edit.component';
import { ErrorComponent } from './error/error.component';

export const routes: Routes = [
  { path: '', component: ExpenseListComponent },
  { path: 'expense-add', component: ExpenseAddComponent },
  { path: 'expense-edit', component: ExpenseEditComponent },
  { path: 'error', component: ErrorComponent },
];
