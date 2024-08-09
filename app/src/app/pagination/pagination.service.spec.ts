import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { PaginationService } from './pagination.service';
import { ExpenseService } from '../expenses/expense.service';
import { HttpClient } from '@angular/common/http';

describe('PaginationService', () => {
  let service: PaginationService;
  let expenseServiceSpy: jasmine.SpyObj<ExpenseService>;
  let httpSpy: jasmine.SpyObj<HttpClient>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [{ provide: ExpenseService }],
    });
    service = TestBed.inject(PaginationService);
    expenseServiceSpy = TestBed.inject(
      ExpenseService
    ) as jasmine.SpyObj<ExpenseService>;
    httpSpy = jasmine.createSpyObj('HttpClient', ['get', 'post']);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have nbPage = 1', () => {
    spyOn(expenseServiceSpy, 'totalExpensesSignal').and.returnValue(2);
    expect(service.nbPages()).toBe(1);
  });

  it('should have nbPage = 1', () => {
    spyOn(expenseServiceSpy, 'totalExpensesSignal').and.returnValue(2);
    expect(service.arrayNbPages().length).toBe(1);
  });
});
