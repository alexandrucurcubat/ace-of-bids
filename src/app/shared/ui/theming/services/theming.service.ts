import { ApplicationRef, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { LOCAL_STORAGE } from '../../../models/local-storage';

export enum Themes {
  LIGHT_THEME = 'light-theme',
  DARK_THEME = 'dark-theme',
}

@Injectable({ providedIn: 'root' })
export class ThemingService {
  themes = [Themes.DARK_THEME, Themes.LIGHT_THEME];
  theme = new BehaviorSubject(Themes.LIGHT_THEME);

  constructor(private ref: ApplicationRef) {
    const darkModeOn =
      window.matchMedia &&
      window.matchMedia('(prefers-color-scheme: dark)').matches;
    const storedTheme = localStorage.getItem(LOCAL_STORAGE.THEME);

    if (storedTheme) {
      this.theme.next(storedTheme as Themes);
    } else if (darkModeOn) {
      this.theme.next(Themes.DARK_THEME);
    }

    window
      .matchMedia('(prefers-color-scheme: dark)')
      .addEventListener('change', (e) => {
        const turnOn = e.matches;
        this.theme.next(turnOn ? Themes.DARK_THEME : Themes.LIGHT_THEME);
        this.ref.tick();
      });
  }

  changeTheme(theme: Themes): void {
    this.theme.next(theme);
    localStorage.setItem(LOCAL_STORAGE.THEME, theme);
  }
}
