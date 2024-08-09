import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpenseFormComponent } from './expense-form.component';
import { provideHttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ExpenseService } from '../expense.service';

describe('ExpenseFormComponent', () => {
  let component: ExpenseFormComponent;
  let fixture: ComponentFixture<ExpenseFormComponent>;
  let expenseServiceSpy: jasmine.SpyObj<ExpenseService>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExpenseFormComponent, HttpClientTestingModule],
      providers: [ExpenseService],
    }).compileComponents();

    fixture = TestBed.createComponent(ExpenseFormComponent);
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

  describe('ngOnInit', () => {
    it('should defined distance when nature = trip', () => {
      component.expenseService.setExpenseSignal({
        id: 50,
        nature: 'trip',
        amount: 965,
        comment: 'Enim maioren.',
        purchasedOn: '2022-05-12',
        distance: 988,
      });
      component.ngOnInit();
      expect(component.form.controls.distance.value).toBe(988);
    });

    it('should defined invites when nature = restaurant', () => {
      component.expenseService.setExpenseSignal({
        id: 50,
        nature: 'restaurant',
        amount: 965,
        comment: 'Enim maioren.',
        purchasedOn: '2022-05-12',
        invites: 988,
      });
      component.ngOnInit();
      expect(component.form.controls.invites.value).toBe(988);
    });
  });

  describe('onSendExpense', () => {
    it('should call emit', () => {
      spyOn(component.newExpense, 'emit');
      component.onSendExpense();
      expect(component.form.valid).toBeTruthy();
      expect(component.newExpense.emit).toHaveBeenCalled();
    });

    it('should call not emit', () => {
      spyOn(component.newExpense, 'emit');
      component.form.patchValue({
        comment: null,
      });
      component.onSendExpense();
      expect(component.form.invalid).toBeTruthy();
      expect(component.newExpense.emit).not.toHaveBeenCalled();
    });
  });

  describe('natureChange', () => {
    it('should call removeValidation', () => {
      spyOn(component, 'removeValidation');
      component.natureChange({ target: { value: 'trip' } });
      expect(component.removeValidation).toHaveBeenCalled();
    });

    it('should call removeValidation', () => {
      spyOn(component, 'removeValidation');
      component.natureChange({ target: { value: 'restaurant' } });
      expect(component.removeValidation).toHaveBeenCalled();
    });
  });
});
