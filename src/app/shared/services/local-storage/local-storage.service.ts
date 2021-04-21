import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';

import { WindowRefService } from '../window-ref/window-ref.service';

@Injectable({ providedIn: 'root' })
export class LocalStorageSrvice {
  constructor(
    @Inject(PLATFORM_ID) private platformId: any,
    private windowRefService: WindowRefService
  ) {}

  getItem(key: string): string | null {
    if (isPlatformBrowser(this.platformId)) {
      return this.windowRefService.nativeWindow.localStorage.getItem(key);
    }
    return null;
  }

  setItem(key: string, value: string): void {
    if (isPlatformBrowser(this.platformId)) {
      this.windowRefService.nativeWindow.localStorage.setItem(key, value);
    }
  }

  removeItem(key: string): void {
    if (isPlatformBrowser(this.platformId)) {
      this.windowRefService.nativeWindow.localStorage.removeItem(key);
    }
  }

  clear(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.windowRefService.nativeWindow.localStorage.clear();
    }
  }
}
