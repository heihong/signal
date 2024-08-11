import { Component, inject, OnInit } from '@angular/core';
import { constants, tripConstant } from '../../utilities/constant/constant';
import { formatDate, NgClass } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ExpenseService } from '../expense.service';
import { RestaurantI, TripI } from '../expense.interface';
import { ExpenseFormComponent } from '../expense-form/expense-form.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-expense-add',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, NgClass, ExpenseFormComponent],
  templateUrl: './expense-add.component.html',
  styleUrl: './expense-add.component.scss',
})
export class ExpenseAddComponent implements OnInit {
  expenseService = inject(ExpenseService);
  router = inject(Router);
  _constant = constants;
  _addExpense = constants.addExpense;
  _fillFormRequired = constants.fillFormRequired;
  _tripConstant = tripConstant;

  nature: string = this._tripConstant;
  amount: number = 0;
  purchasedOn: any = formatDate(new Date(), 'yyyy-MM-dd', 'en');
  comment: string = '';
  distance: number = 0;
  invites: number = 0;
  submit = false;

  ngOnInit(): void {
    this.expenseService.setExpenseSignal({
      nature: this.nature,
      amount: this.amount,
      purchasedOn: this.purchasedOn,
      comment: this.comment,
      distance: this.distance,
    });
  }

  sendExpense(expense: RestaurantI | TripI) {
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
    this.expenseService.sendExpense(result as RestaurantI | TripI).subscribe({
     next: () => {
       this.expenseService.reload();
       this.router.navigate(['']);
     },
     error: () => this.router.navigate(['error'])
    });
  }
}
