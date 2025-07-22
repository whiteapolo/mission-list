import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { Icon } from '../types';
import * as icons from './icons';

@NgModule({
  declarations: [],
  imports: [CommonModule],
})
export class IconsModule {
  constructor(
    private matIconRegistry: MatIconRegistry,
    sanitizer: DomSanitizer
  ) {
    console.log('heloo worls');
    Object.values(icons).forEach((icon: Icon) => {
      this.matIconRegistry.addSvgIconLiteral(
        icon.name,
        sanitizer.bypassSecurityTrustHtml(icon.src)
      );
    });
  }
}
