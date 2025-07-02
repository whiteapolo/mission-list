import { Component, Input } from '@angular/core';

@Component({
  selector: 'click-wrapper',
  templateUrl: './click-wrapper.component.html',
  styleUrls: ['./click-wrapper.component.less'],
})
export class ClickWrapperComponent {
  @Input() clickRadius: number = 0;
}
