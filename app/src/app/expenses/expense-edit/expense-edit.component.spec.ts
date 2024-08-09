import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpenseEditComponent } from './expense-edit.component';
import { ExpenseService } from '../expense.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

describe('ExpenseEditComponent', () => {
  let component: ExpenseEditComponent;
  let fixture: ComponentFixture<ExpenseEditComponent>;
  let expenseServiceSpy: jasmine.SpyObj<ExpenseService>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExpenseEditComponent, HttpClientTestingModule],
      providers: [ExpenseService],
    }).compileComponents();

    fixture = TestBed.createComponent(ExpenseEditComponent);
    expenseServiceSpy = TestBed.inject(
      ExpenseService
    ) as jasmine.SpyObj<ExpenseService>;
    component = fixture.componentInstance;
    component.expenseService.setExpenseSignal({
      id: 50,
      nature: 'trip',
      amount: 965,
      comment: 'Enim maioren.',
      purchasedOn: '2022-05-12',
      distance: 988,
    });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('sendExpense', () => {
    it('should call setExpenseSignal when nature = trip', () => {
      let expense = {
        id: 50,
        nature: 'trip',
        amount: 965,
        comment: 'Enim maioren.',
        purchasedOn: '2022-05-12',
        distance: 988,
      };

      let result = {
        nature: expense.nature,
        amount: expense.amount,
        comment: expense.comment,
        purchasedOn: expense.purchasedOn,
        distance: expense.distance,
      };
      spyOn(expenseServiceSpy, 'setExpenseSignal');
      spyOn(expenseServiceSpy, 'editExpense').and.returnValue(of());
      component.sendExpense(expense);
      expect(expenseServiceSpy.setExpenseSignal).toHaveBeenCalledWith(expense);
      expect(expenseServiceSpy.editExpense).toHaveBeenCalledWith(result);
    });

    it('should call setExpenseSignal when nature = restaurant', () => {
      let expense = {
        id: 50,
        nature: 'restaurant',
        amount: 965,
        comment: 'Enim maioren.',
        purchasedOn: '2022-05-12',
        invites: 988,
      };

      let result = {
        nature: expense.nature,
        amount: expense.amount,
        comment: expense.comment,
        purchasedOn: expense.purchasedOn,
        invites: expense.invites,
      };
      spyOn(expenseServiceSpy, 'setExpenseSignal');
      spyOn(expenseServiceSpy, 'editExpense').and.returnValue(of());
      component.sendExpense(expense);
      fixture.detectChanges();
      expect(expenseServiceSpy.setExpenseSignal).toHaveBeenCalledWith(expense);
      expect(expenseServiceSpy.editExpense).toHaveBeenCalledWith(result);
    });
  });

  describe('editExpense', () => {
    it('should call setExpenseSignal when nature = restaurant', () => {
      let expense = {
        id: 50,
        nature: 'restaurant',
        amount: 965,
        comment: 'Enim maioren.',
        purchasedOn: '2022-05-12',
        invites: 988,
      };
      spyOn(expenseServiceSpy, 'setExpenseSignal');
      component.editExpense(expense);
      expect(expenseServiceSpy.setExpenseSignal).toHaveBeenCalledWith(expense);
    });
  });
});
