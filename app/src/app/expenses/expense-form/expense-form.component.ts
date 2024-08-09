import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { ExpenseService } from '../expense.service';
import {
  constants,
  natureContant,
  tripConstant,
} from '../../utilities/constant/constant';
import { formatDate, NgClass } from '@angular/common';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RestaurantI, TripI } from '../expense.interface';

@Component({
  selector: 'app-expense-form',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, NgClass],
  templateUrl: './expense-form.component.html',
  styleUrl: './expense-form.component.scss',
})
export class ExpenseFormComponent implements OnInit {
  expenseService = inject(ExpenseService);
  _natureContant = natureContant;
  _tripConstant = tripConstant;
  _constant = constants;
  _filedRequired = constants.filedRequired;
  _fiedError = constants.fiedError;

  @Output() newExpense = new EventEmitter<RestaurantI | TripI>();

  nature: string | null = this._tripConstant;
  amount: number | null = 0;
  purchasedOn: any = new Date();
  comment: string | null = null;
  distance: number | null = 0;
  invites: number | null = 0;

  submit = false;

  form = new FormGroup({
    nature: new FormControl(this.nature, [Validators.required]),
    amount: new FormControl(this.amount, [
      Validators.required,
      Validators.pattern('^[0-9]*'),
    ]),
    comment: new FormControl(this.comment, Validators.required),
    purchasedOn: new FormControl(
      formatDate(this.purchasedOn, 'yyyy-MM-dd', 'en'),
      Validators.required
    ),
    distance: new FormControl(this.distance), // only for trip
    invites: new FormControl(this.invites), // only for restaurant
  });

  amountError = false;
  commentError = false;

  expenseSignal: any = this.expenseService.expenseSignal;

  ngOnInit(): void {
    this.form.patchValue({
      nature: this.expenseSignal().nature,
      amount: this.expenseSignal().amount,
      comment: this.expenseSignal().comment,
      purchasedOn: this.expenseSignal().purchasedOn,
    });
    if (this.expenseSignal().nature === this._tripConstant) {
      this.form.patchValue({ distance: this.expenseSignal().distance });
    } else {
      this.form.patchValue({ invites: this.expenseSignal().invites });
    }

    if (this.form.get('nature')?.value === tripConstant) {
      this.form
        .get('distance')
        ?.setValidators([Validators.required, Validators.pattern('^[0-9]*')]);
    } else {
      this.form
        .get('invites')
        ?.setValidators([Validators.required, Validators.pattern('^[0-9]*')]);
    }

    this.form.get('comment')?.valueChanges.subscribe((control) => {
      if (control === '' || null) {
        this.commentError = true;
      } else {
        this.commentError = false;
      }
    });
  }

  onSendExpense() {
    this.submit = true;
    if (this.form.invalid || this.commentError || this.amountError) {
      return;
    }
    this.newExpense.emit(this.form.value as RestaurantI | TripI);
  }

  natureChange(event: any) {
    if (event.target.value === tripConstant) {
      this.form
        .get('distance')
        ?.setValidators([Validators.required, Validators.pattern('^[0-9]*')]);
      this.removeValidation(this.form.get('invites'));
    } else {
      this.form
        .get('invites')
        ?.setValidators([Validators.required, Validators.pattern('^[0-9]*')]);
      this.removeValidation(this.form.get('distance'));
    }
  }

  removeValidation(controlName: any) {
    controlName.setValidators(null);
    controlName.updateValueAndValidity();
  }
}
