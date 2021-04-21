import { Injectable } from '@angular/core';
import { OverlayContainer } from '@angular/cdk/overlay';
import { BehaviorSubject } from 'rxjs';

import { LocalStorage } from '../../models/local-storage';
import { LocalStorageSrvice } from '../local-storage/local-storage.service';

export enum Theme {
  LIGHT_THEME = 'light-theme',
  DARK_THEME = 'dark-theme',
}

@Injectable({ providedIn: 'root' })
export class ThemingService {
  private themes = [Theme.LIGHT_THEME, Theme.DARK_THEME];
  private themeSubject = new BehaviorSubject(Theme.LIGHT_THEME);
  theme$ = this.themeSubject.asObservable();

  constructor(
    private overlayContainer: OverlayContainer,
    private localStorageService: LocalStorageSrvice
  ) {
    const theme = this.localStorageService.getItem(LocalStorage.THEME);
    this.applyTheme(theme ? (theme as Theme) : Theme.LIGHT_THEME);
  }

  applyTheme(theme: Theme): void {
    this.themeSubject.next(theme);
    const overlayContainerClasses = this.overlayContainer.getContainerElement()
      .classList;
    const themeClassesToRemove = Array.from(this.themes);
    if (themeClassesToRemove.length) {
      overlayContainerClasses.remove(...themeClassesToRemove);
    }
    overlayContainerClasses.add(theme);
    this.localStorageService.setItem(LocalStorage.THEME, theme);
  }
}
