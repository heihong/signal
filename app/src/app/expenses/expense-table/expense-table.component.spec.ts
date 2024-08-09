import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpenseTableComponent } from './expense-table.component';
import { ExpenseService } from '../expense.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ExpenseTableComponent', () => {
  let component: ExpenseTableComponent;
  let fixture: ComponentFixture<ExpenseTableComponent>;
  let expenseServiceSpy: jasmine.SpyObj<ExpenseService>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExpenseTableComponent, HttpClientTestingModule],
      providers: [ExpenseService],
    }).compileComponents();

    fixture = TestBed.createComponent(ExpenseTableComponent);
    expenseServiceSpy = TestBed.inject(
      ExpenseService
    ) as jasmine.SpyObj<ExpenseService>;
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  describe('onEditExpense', () => {
    it('should call emit', () => {
      let expense = {
        id: 50,
        nature: 'restaurant',
        amount: 965,
        comment: 'Enim maioren.',
        purchasedOn: '2022-05-12',
        invites: 988,
      };
      spyOn(component.newExpense, 'emit');
      component.onEditExpense(expense);
      expect(component.newExpense.emit).toHaveBeenCalled();
    });
  });
});
