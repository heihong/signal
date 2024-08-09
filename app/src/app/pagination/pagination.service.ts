import { computed, inject, Injectable } from '@angular/core';
import { ExpenseService } from '../expenses/expense.service';

@Injectable({
  providedIn: 'root',
})
export class PaginationService {
  expenseService = inject(ExpenseService);

  nbPages = computed(() =>
    Math.ceil(this.expenseService.totalExpensesSignal() / 10)
  );

  arrayNbPages = computed(() => new Array(this.nbPages()));
}
