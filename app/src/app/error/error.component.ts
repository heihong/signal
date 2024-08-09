import { Component } from '@angular/core';
import { errorConstant } from '../utilities/constant/constant';

@Component({
  selector: 'app-error',
  standalone: true,
  imports: [],
  templateUrl: './error.component.html',
})
export class ErrorComponent {
  _errorConstant = errorConstant;
}
