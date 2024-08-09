import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpenseListComponent } from './expense-list.component';
import { ExpenseTableComponent } from '../expense-table/expense-table.component';
import { PaginationComponent } from '../../pagination/pagination.component';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ExpenseService } from '../expense.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ExpenseListComponent', () => {
  let component: ExpenseListComponent;
  let fixture: ComponentFixture<ExpenseListComponent>;
  let expenseServiceSpy: jasmine.SpyObj<ExpenseService>;
  const fakeActivatedRoute = {
    snapshot: { data: {} },
  } as ActivatedRoute;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ExpenseListComponent,
        ExpenseTableComponent,
        PaginationComponent,
        RouterLink,
        HttpClientTestingModule,
      ],
      providers: [
        ExpenseService,
        { provide: ActivatedRoute, useValue: fakeActivatedRoute },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ExpenseListComponent);
    expenseServiceSpy = TestBed.inject(
      ExpenseService
    ) as jasmine.SpyObj<ExpenseService>;
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('editExpense', () => {
    it('should call setExpenseSignal', () => {
      let expense = {
        id: 50,
        nature: 'restaurant',
        amount: 965,
        comment: 'Enim maioren.',
        purchasedOn: '2022-05-12',
        invites: 988,
      };
      spyOn(expenseServiceSpy, 'setExpenseSignal');
      spyOn(component.router, 'navigate');
      component.editExpense(expense);
      expect(expenseServiceSpy.setExpenseSignal).toHaveBeenCalledWith(expense);
      expect(component.router.navigate).toHaveBeenCalledWith(['/expense-edit']);
    });
  });
});
