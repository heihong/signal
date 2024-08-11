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
    let expense = {
      id: 50,
      nature: 'trip',
      amount: 965,
      comment: 'Enim maioren.',
      purchasedOn: '2022-05-12',
      distance: 988,
    };
    component.expenseService.setExpenseSignal({
      ...expense,
    });
    component.expenseSignal = {
      ...expense,
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('sendExpense', () => {
    it('should call sendExpense when nature = trip', () => {
      const reloadDataSpy = spyOn(expenseServiceSpy, 'reload');
      let expense = {
        id: 50,
        nature: 'trip',
        amount: 965,
        comment: 'Enim maioren.',
        purchasedOn: '2022-05-12',
        distance: 988,
      };

      let result = {
        id: 50,
        nature: expense.nature,
        amount: 985,
        comment: expense.comment,
        purchasedOn: expense.purchasedOn,
        distance: expense.distance,
      };
      spyOn(expenseServiceSpy, 'editExpense').and.returnValue(
        of({ ...expense })
      );
      expenseServiceSpy.setExpenseSignal(expense);
      component.sendExpense(result);
      fixture.detectChanges();
      expect(expenseServiceSpy.editExpense).toHaveBeenCalledWith(result);
      expect(reloadDataSpy).toHaveBeenCalled();
    });

    it('should call setExpenseSignal when nature = restaurant', () => {
      const reloadDataSpy = spyOn(expenseServiceSpy, 'reload');
      let expense = {
        id: 50,
        nature: 'restaurant',
        amount: 965,
        comment: 'Enim maioren.',
        purchasedOn: '2022-05-12',
        invites: 988,
      };

      let result = {
        id: 50,
        nature: expense.nature,
        amount: 896,
        comment: expense.comment,
        purchasedOn: expense.purchasedOn,
        invites: expense.invites,
      };
      spyOn(expenseServiceSpy, 'editExpense').and.returnValue(
        of({ ...expense })
      );

      expenseServiceSpy.setExpenseSignal(expense);
      component.sendExpense(result);
      fixture.detectChanges();
      expect(expenseServiceSpy.editExpense).toHaveBeenCalledWith(result);
      expect(reloadDataSpy).toHaveBeenCalled();
    });
  });
});
