import { Component, EventEmitter, inject, Output } from '@angular/core';
import {
  headerContant,
  updatedAtColumn,
} from '../../utilities/constant/constant';
import { ExpenseService } from '../expense.service';
import { AsyncPipe } from '@angular/common';
import { Router } from '@angular/router';
import { RestaurantI, TripI } from '../expense.interface';

@Component({
  selector: 'app-expense-table',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './expense-table.component.html',
  styleUrl: './expense-table.component.scss',
})
export class ExpenseTableComponent {
  _headerConstant = headerContant;
  _updatedAtColumn = updatedAtColumn;
  @Output() newExpense = new EventEmitter<RestaurantI | TripI>();

  expenseService = inject(ExpenseService);
  router = inject(Router);

  expenses = this.expenseService.expenses;

  onEditExpense(expense: RestaurantI | TripI) {
    this.newExpense.emit(expense as RestaurantI | TripI);
  }
}
