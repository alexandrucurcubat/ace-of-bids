import { Injectable } from '@angular/core';
import { MatDrawer, MatDrawerToggleResult } from '@angular/material/sidenav';

@Injectable({ providedIn: 'root' })
export class DrawerService {
  private drawer!: MatDrawer;

  setDrawer(drawer: MatDrawer): void {
    this.drawer = drawer;
  }

  open(): Promise<MatDrawerToggleResult> {
    return this.drawer.open();
  }

  close(): Promise<MatDrawerToggleResult> {
    return this.drawer.close();
  }

  toggle(): void {
    this.drawer.toggle();
  }
}
