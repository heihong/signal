import { TestBed } from '@angular/core/testing';
import { ExpenseService } from './expense.service';
import { HttpClient, provideHttpClient } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { of } from 'rxjs';

describe('ExpenseService', () => {
  let service: ExpenseService;
  let httpSpy: jasmine.SpyObj<HttpClient>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [{ provide: ExpenseService }],
    });
    service = TestBed.inject(ExpenseService);
    httpSpy = jasmine.createSpyObj('HttpClient', ['get', 'post', 'put']);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('setCurrentPageSignal', () => {
    it('should be call set', () => {
      spyOn(service.currentPageSignal, 'set');
      service.setCurrentPageSignal(1);
      expect(service.currentPageSignal.set).toHaveBeenCalled();
    });
  });

  it('should validate sendExpense', () => {
    let expense = {
      nature: 'restaurant',
      amount: 965,
      comment: 'Enim maioren.',
      purchasedOn: '2022-05-12',
      invites: 988,
    };
    (httpSpy.post as jasmine.Spy).and.returnValue(of(expense));
    service.sendExpense(expense).subscribe((x) => {
      expect(x).toEqual(expense as any);
    });
  });

  it('should validate editExpense', () => {
    let expense = {
      nature: 'restaurant',
      amount: 965,
      comment: 'Enim maioren.',
      purchasedOn: '2022-05-12',
      invites: 988,
    };
    spyOn(service, 'expenseSignal').and.returnValue({
      id: 50,
      nature: 'trip',
      amount: 965,
      comment: 'Enim maioren.',
      purchasedOn: '2022-05-12',
      distance: 988,
    });
    (httpSpy.put as jasmine.Spy).and.returnValue(of(expense));
    service.editExpense(expense).subscribe((x) => {
      expect(x).toEqual(expense as any);
    });
  });
});
