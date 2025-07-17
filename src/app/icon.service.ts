import { Injectable } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import * as Icons from './icons';
import { Icon } from './types';
import { DomSanitizer } from '@angular/platform-browser';

@Injectable({
  providedIn: 'platform',
})
export class IconService {
  constructor(
    private matIconRegistry: MatIconRegistry,
    sanitizer: DomSanitizer
  ) {
    Object.values(Icons).forEach((icon: Icon) => {
      this.matIconRegistry.addSvgIconLiteral(
        icon.name,
        sanitizer.bypassSecurityTrustHtml(icon.src)
      );
    });
  }
}
