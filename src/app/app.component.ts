import { Component, HostBinding, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { OverlayContainer } from '@angular/cdk/overlay';
import { Subscription } from 'rxjs';

import { AuthDialogComponent } from './shared/auth/auth-dialog/auth-dialog.component';
import { Themes, ThemingService } from './shared/ui/theming.service';

@Component({
  selector: 'ace-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
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
    setTimeout(() => {
      this.loading = false;
    }, 1000);
  }

  ngOnInit(): void {
    this.themingSubscription = this.themingService.theme.subscribe(
      (theme: Themes) => {
        this.themeClass = theme;
        this.applyThemeOnOverlays();
      }
    );
  }

  changeTheme(theme: Themes): void {
    this.themingService.theme.next(theme);
  }

  openAuthDialog(): void {
    const dialogRef = this.dialog.open(AuthDialogComponent);
    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
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
