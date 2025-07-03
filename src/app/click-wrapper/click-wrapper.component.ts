import { Component, Input } from '@angular/core';

@Component({
  selector: 'click-wrapper',
  template: `
    <div [style.padding.px]="clickRadiusPx" class="clickable">
      <ng-content></ng-content>
    </div>
  `,
})
export class ClickWrapperComponent {
  @Input() clickRadiusPx: number = 0;
}
