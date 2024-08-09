import { HttpHeaders } from '@angular/common/http';
import { HttpParams } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal, computed, effect } from '@angular/core';
import { catchError, map, switchMap } from 'rxjs';
import { ExpensesI, RestaurantI, TripI } from './expense.interface';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class ExpenseService {
  http = inject(HttpClient);
  router = inject(Router);

  currentPageSignal = signal<number>(1);

  setCurrentPageSignal(currentPage: number) {
    this.currentPageSignal.set(currentPage);
  }

  headers = new HttpHeaders();
  params = computed(() =>
    new HttpParams().set('page', this.currentPageSignal()).set('limit', 10)
  );

  url = `http://localhost:3000/expenses`;

  expensesResult$ = toObservable(this.params).pipe(
    switchMap((param) => {
      return this.http
        .get<ExpensesI>(this.url, {
          headers: this.headers,
          params: param,
        })
        .pipe(map((x: any) => x));
    }),
    catchError(() => this.router.navigate(['error']))
  );

  initialValue: ExpensesI = {
    items: [],
    count: 0,
  };

  private expensesResult = toSignal(this.expensesResult$, {
    initialValue: this.initialValue,
  });

  expenses = computed(() => this.expensesResult().items);

  totalExpensesSignal = computed(() => this.expensesResult().count);

  sendExpense(expense: RestaurantI | TripI) {
    return this.http.post<ExpensesI>(this.url, expense);
  }

  expenseSignal = signal<RestaurantI | TripI | null>(null);

  setExpenseSignal(expense: RestaurantI | TripI | null) {
    this.expenseSignal.set(expense);
  }

  editExpense(expense: RestaurantI | TripI) {
    return this.http.put<ExpensesI>(this.url + `/${this.expenseSignal()?.id}`, {
      ...expense,
      id: this.expenseSignal()?.id,
    });
  }
}
