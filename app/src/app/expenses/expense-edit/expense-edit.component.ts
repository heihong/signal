import { Component, inject } from '@angular/core';
import { constants, tripConstant } from '../../utilities/constant/constant';
import { ExpenseFormComponent } from '../expense-form/expense-form.component';
import { RestaurantI, TripI } from '../expense.interface';
import { ExpenseService } from '../expense.service';
import { ExpenseTableComponent } from '../expense-table/expense-table.component';
import { PaginationComponent } from '../../pagination/pagination.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-expense-edit',
  standalone: true,
  imports: [ExpenseFormComponent, ExpenseTableComponent, PaginationComponent],
  templateUrl: './expense-edit.component.html',
  styleUrl: './expense-edit.component.scss',
})
export class ExpenseEditComponent {
  expenseService = inject(ExpenseService);
  router = inject(Router);
  _constant = constants;
  _editExpense = constants.editExpense;
  _fillFormRequired = constants.fillFormRequired;
  _tripConstant = tripConstant;

  expenseSignal = this.expenseService.expenseSignal();

  sendExpense(expense: RestaurantI | TripI) {
    let expenseSignal = this.expenseService.expenseSignal();
    let currentPage = this.expenseService.currentPageSignal;

    let result = null;

    if (expense.nature === this._tripConstant) {
      result = {
        nature: expense.nature,
        amount: expense.amount,
        comment: expense.comment,
        purchasedOn: expense.purchasedOn,
        distance: expense.distance,
      };
    } else {
      result = {
        nature: expense.nature,
        amount: expense.amount,
        comment: expense.comment,
        purchasedOn: expense.purchasedOn,
        invites: expense.invites,
      };
    }
    this.expenseService.setExpenseSignal({ ...expense, id: expenseSignal?.id });

    this.expenseService.editExpense(result as RestaurantI | TripI).subscribe(
      (x) => {
        if (currentPage() === 1) {
          this.expenseService.setCurrentPageSignal(0);
          this.expenseService.setCurrentPageSignal(1);
        }
        this.router.navigate(['']);
      },
      (err) => this.router.navigate(['error'])
    );
  }

  editExpense(expense: RestaurantI | TripI) {
    let expenseSignal = this.expenseService.expenseSignal();
    this.expenseService.setExpenseSignal({ ...expense, id: expenseSignal?.id });
  }
}
