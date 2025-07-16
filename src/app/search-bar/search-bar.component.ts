import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.less'],
})
export class SearchBarComponent {
  @Output() change = new EventEmitter<string>();

  emitInputChange(event: Event): void {
    this.change.emit((event.target as HTMLInputElement).value);
  }
}
