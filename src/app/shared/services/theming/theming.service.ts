import { Injectable } from '@angular/core';
import { OverlayContainer } from '@angular/cdk/overlay';
import { BehaviorSubject } from 'rxjs';

import { LocalStorage } from '../../models/local-storage';

export enum Theme {
  LIGHT_THEME = 'light-theme',
  DARK_THEME = 'dark-theme',
}

@Injectable({ providedIn: 'root' })
export class ThemingService {
  private themeSubject = new BehaviorSubject(Theme.LIGHT_THEME);
  theme$ = this.themeSubject.asObservable();

  constructor(private overlayContainer: OverlayContainer) {
    const localTheme = localStorage.getItem(LocalStorage.THEME) as Theme;
    this.themeSubject.next(localTheme ? localTheme : Theme.LIGHT_THEME);
    this.applyThemeOnOverlays(localTheme);
  }

  changeTheme(theme: Theme): void {
    this.themeSubject.next(theme);
    this.applyThemeOnOverlays(theme);
    localStorage.setItem(LocalStorage.THEME, theme);
  }

  private applyThemeOnOverlays(theme: string): void {
    const overlayContainerClasses = this.overlayContainer.getContainerElement()
      .classList;
    const themeClassesToRemove = Array.from([
      Theme.LIGHT_THEME,
      Theme.DARK_THEME,
    ]);
    if (themeClassesToRemove.length) {
      overlayContainerClasses.remove(...themeClassesToRemove);
    }
    overlayContainerClasses.add(theme);
  }
}
