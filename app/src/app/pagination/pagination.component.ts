import { Component, inject } from '@angular/core';
import { paginationConstant } from '../utilities/constant/constant';
import { PaginationService } from './pagination.service';
import { NgClass } from '@angular/common';
import { ExpenseService } from '../expenses/expense.service';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [NgClass],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.scss',
})
export class PaginationComponent {
  paginationService = inject(PaginationService);
  expenseService = inject(ExpenseService);
  _paginationContant = paginationConstant;

  nbPages = this.paginationService.nbPages;

  arrayNbPages = this.paginationService.arrayNbPages;

  currentPageSignal = this.expenseService.currentPageSignal;

  changePage(currentPage: number) {
    this.expenseService.setCurrentPageSignal(currentPage);
  }
}
