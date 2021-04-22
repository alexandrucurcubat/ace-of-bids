import { Injectable } from '@angular/core';

function _window(): Window & typeof globalThis {
  return window;
}

@Injectable({ providedIn: 'root' })
export class WindowRefService {
  get nativeWindow(): Window & typeof globalThis {
    return _window();
  }
}
