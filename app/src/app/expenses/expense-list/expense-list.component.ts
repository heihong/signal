import { Component, inject } from '@angular/core';
import { ExpenseTableComponent } from '../expense-table/expense-table.component';
import { PaginationComponent } from '../../pagination/pagination.component';
import { Router, RouterLink } from '@angular/router';
import { constants } from '../../utilities/constant/constant';
import { RestaurantI, TripI } from '../expense.interface';
import { ExpenseService } from '../expense.service';

@Component({
  selector: 'app-expense-list',
  standalone: true,
  imports: [ExpenseTableComponent, PaginationComponent, RouterLink],
  templateUrl: './expense-list.component.html',
  styleUrl: './expense-list.component.scss',
})
export class ExpenseListComponent {
  _titleExpenseList = constants.titleExpenseList;
  _addExpense = constants.addExpense;
  expenseService = inject(ExpenseService);
  router = inject(Router);

  editExpense(expense: RestaurantI | TripI) {
    this.expenseService.setExpenseSignal(expense);
    this.router.navigate(['/expense-edit']);
  }
}
