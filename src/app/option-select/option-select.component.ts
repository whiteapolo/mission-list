import {
  Component,
  EventEmitter,
  HostBinding,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatSelectChange } from '@angular/material/select';

@Component({
  selector: 'option-select',
  templateUrl: './option-select.component.html',
  styleUrls: ['./option-select.component.less'],
})
export class OptionSelectComponent {
  @Input() options: string[] = [];
  @Input() control!: FormControl;
}
