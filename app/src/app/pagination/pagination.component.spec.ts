import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginationComponent } from './pagination.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ExpenseService } from '../expenses/expense.service';

describe('PaginationComponent', () => {
  let component: PaginationComponent;
  let fixture: ComponentFixture<PaginationComponent>;
  let expenseServiceSpy: jasmine.SpyObj<ExpenseService>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaginationComponent, HttpClientTestingModule],
      providers: [ExpenseService],
    }).compileComponents();

    fixture = TestBed.createComponent(PaginationComponent);
    expenseServiceSpy = TestBed.inject(
      ExpenseService
    ) as jasmine.SpyObj<ExpenseService>;
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('changePage', () => {
    it('should call setCurrentPageSignal', () => {
      spyOn(expenseServiceSpy, 'setCurrentPageSignal');
      component.changePage(2);
      expect(expenseServiceSpy.setCurrentPageSignal).toHaveBeenCalledWith(2);
    });
  });
});
