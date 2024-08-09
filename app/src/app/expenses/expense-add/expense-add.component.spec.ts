import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpenseAddComponent } from './expense-add.component';
import { ExpenseService } from '../expense.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

describe('ExpenseAddComponent', () => {
  let component: ExpenseAddComponent;
  let fixture: ComponentFixture<ExpenseAddComponent>;
  let expenseServiceSpy: jasmine.SpyObj<ExpenseService>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExpenseAddComponent, HttpClientTestingModule],
      providers: [ExpenseService],
    }).compileComponents();

    fixture = TestBed.createComponent(ExpenseAddComponent);
    expenseServiceSpy = TestBed.inject(
      ExpenseService
    ) as jasmine.SpyObj<ExpenseService>;
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  describe('sendExpense', () => {
    it('should call sendExpense when nature = trip', () => {
      let expense = {
        nature: 'trip',
        amount: 965,
        comment: 'Enim maioren.',
        purchasedOn: '2022-05-12',
        distance: 988,
      };
      spyOn(expenseServiceSpy, 'sendExpense').and.returnValue(of());
      spyOn(expenseServiceSpy, 'setCurrentPageSignal');
      component.sendExpense(expense);
      fixture.detectChanges();
      expect(expenseServiceSpy.sendExpense).toHaveBeenCalledWith(expense);
      expect(expenseServiceSpy.setCurrentPageSignal).toHaveBeenCalledWith(1);
    });

    it('should call setCurrentPageSignal when nature = restaurant', () => {
      let expense = {
        nature: 'restaurant',
        amount: 965,
        comment: 'Enim maioren.',
        purchasedOn: '2022-05-12',
        invites: 988,
      };
      spyOn(expenseServiceSpy, 'sendExpense').and.returnValue(of());
      spyOn(expenseServiceSpy, 'setCurrentPageSignal');
      component.sendExpense(expense);
      fixture.detectChanges();
      expect(expenseServiceSpy.sendExpense).toHaveBeenCalledWith(expense);
      expect(expenseServiceSpy.setCurrentPageSignal).toHaveBeenCalledWith(1);
    });
  });
});
