import { HttpHeaders } from '@angular/common/http';
import { HttpParams } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal, computed, effect } from '@angular/core';
import {
  BehaviorSubject,
  catchError,
  map,
  startWith,
  switchMap,
  tap,
} from 'rxjs';
import { ExpensesI, RestaurantI, TripI } from './expense.interface';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class ExpenseService {
  private readonly reloadData$ = new BehaviorSubject<void>(undefined);

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

  params$ = toObservable(this.params).pipe(startWith(this.params()));

  expensesResult$ = this.reloadData$.pipe(
    switchMap(() => this.params$),
    switchMap((param) => {
      return this.http.get<ExpensesI>(this.url, {
        headers: this.headers,
        params: param,
      });
    }),
    map((x: any) => x),
    catchError((error) => {
      console.error(error);
      return this.router.navigate(['error']);
    })
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
    return this.http.post<RestaurantI | TripI>(this.url, expense);
  }

  expenseSignal = signal<RestaurantI | TripI | null>(null);

  setExpenseSignal(expense: RestaurantI | TripI | null) {
    this.expenseSignal.set(expense);
  }

  editExpense(expense: RestaurantI | TripI) {
    return this.http.put<RestaurantI | TripI>(this.url + `/${expense?.id}`, {
      ...expense,
      id: expense?.id,
    });
  }

  reload(): void {
    this.currentPageSignal.set(1);
    this.reloadData$.next();
  }
}
