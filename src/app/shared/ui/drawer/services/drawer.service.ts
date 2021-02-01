import { Injectable } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';

@Injectable({ providedIn: 'root' })
export class DrawerService {
  private drawer!: MatDrawer;

  setDrawer(drawer: MatDrawer) {
    this.drawer = drawer;
  }

  open() {
    return this.drawer.open();
  }

  close() {
    return this.drawer.close();
  }

  toggle(): void {
    this.drawer.toggle();
  }
}
