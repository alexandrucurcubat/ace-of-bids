import { Component, HostBinding, OnDestroy, OnInit } from '@angular/core';
import { OverlayContainer } from '@angular/cdk/overlay';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';

import { Themes, ThemingService } from './shared/ui/theming.service';
import { AuthDialogComponent } from './shared/auth/auth-dialog/auth-dialog.component';
import { environment } from 'src/environments/environment';
import { Environment } from './shared/models/environment';

@Component({
  selector: 'ace-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  env: Environment;
  @HostBinding('class')
  themeClass: Themes = Themes.LIGHT_THEME;
  ThemesEnum = Themes;
  themingSubscription: Subscription = new Subscription();
  loading = true;

  constructor(
    public dialog: MatDialog,
    private themingService: ThemingService,
    private overlayContainer: OverlayContainer
  ) {
    this.env = environment;
  }

  ngOnInit(): void {
    this.themingSubscription = this.themingService.theme.subscribe(
      (theme: Themes) => {
        this.themeClass = theme;
        this.applyThemeOnOverlays();
      }
    );
    setTimeout(() => {
      this.loading = false;
    }, 1000);
  }

  onOpenAuthDialog(): void {
    this.dialog.open(AuthDialogComponent);
  }

  onChangeTheme(theme: Themes): void {
    this.themingService.changeTheme(theme);
  }

  private applyThemeOnOverlays(): void {
    const overlayContainerClasses = this.overlayContainer.getContainerElement()
      .classList;
    const themeClassesToRemove = Array.from(this.themingService.themes);
    if (themeClassesToRemove.length) {
      overlayContainerClasses.remove(...themeClassesToRemove);
    }
    overlayContainerClasses.add(this.themeClass);
  }

  ngOnDestroy(): void {
    this.themingSubscription.unsubscribe();
  }
}
