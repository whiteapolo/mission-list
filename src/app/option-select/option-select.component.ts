import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'option-select',
  templateUrl: './option-select.component.html',
  styleUrls: ['./option-select.component.less'],
})
export class OptionSelectComponent {
  @Input() options: string[] = [];
  @Input() control!: FormControl;
}
