import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import { MISSIONS_LOCAL_STORAGE_KEY } from './app/constants';

function resetLocalStorage(): void {
  fetch('/assets/missions.json')
    .then((res) => res.json())
    .then((json) =>
      localStorage.setItem(MISSIONS_LOCAL_STORAGE_KEY, JSON.stringify(json))
    )
    .catch((e) => console.log(e));
}

// resetLocalStorage();

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch((err) => console.error(err));
