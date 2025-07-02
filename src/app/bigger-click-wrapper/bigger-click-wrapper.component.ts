import { Component, Input } from '@angular/core';

@Component({
  selector: 'bigger-click-wrapper',
  templateUrl: './bigger-click-wrapper.component.html',
  styleUrls: ['./bigger-click-wrapper.component.less'],
})
export class BiggerClickWrapperComponent {
  @Input() clickRadius = 0;
}
