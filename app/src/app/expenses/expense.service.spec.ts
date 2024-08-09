import {fakeAsync, TestBed} from '@angular/core/testing';
import { ExpenseService } from './expense.service';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';

const expenseFactory = () => {
  return {
    nature: 'restaurant',
    amount: 965,
    comment: 'Enim maioren.',
    purchasedOn: '2022-05-12',
    invites: 988,
  };
}

const expectedExpenses = {
  items: [expenseFactory()],
  count: 1
};

describe('ExpenseService', () => {
  let service: ExpenseService;
  let httpSpy: jasmine.SpyObj<HttpClient>;

  beforeEach(() => {
    httpSpy = jasmine.createSpyObj('HttpClient', ['get', 'post', 'put']);
    httpSpy.get.and.returnValue(of(expectedExpenses));

      TestBed.configureTestingModule({
      providers: [{
        provide: HttpClient,
        useValue: httpSpy
      }, ExpenseService ],
    });
    service = TestBed.inject(ExpenseService);
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

  it('should validate sendExpense', fakeAsync(() => {
    let expense = expenseFactory();
    (httpSpy.post as jasmine.Spy).and.returnValue(of(expense));
    service.sendExpense(expense).subscribe((x) => {
      expect(x).toEqual(expense as any);
    });
  }));

  it('should validate editExpense', fakeAsync(() => {
    let expense = expenseFactory()
    spyOn(service, 'expenseSignal').and.returnValue(expense);
    (httpSpy.put as jasmine.Spy).and.returnValue(of(expense));
    service.editExpense(expense).subscribe((x) => {
      expect(x).toEqual(expense as any);
    });
  }))

  it('should reload data', () => {
    expect(service.expenses()).toEqual(expectedExpenses.items);
    expect(httpSpy.get).toHaveBeenCalledTimes(1);
    service.reload();
    expect(service.currentPageSignal()).toEqual(1);
    expect(httpSpy.get).toHaveBeenCalledTimes(2);
  })
});
