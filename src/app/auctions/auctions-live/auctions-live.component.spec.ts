import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AuctionsLiveComponent } from './auctions-live.component';
import { MaterialModule } from 'src/app/shared/ui/material/material.module';

describe('AuctionsLiveComponent', () => {
  let component: AuctionsLiveComponent;
  let fixture: ComponentFixture<AuctionsLiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AuctionsLiveComponent],
      imports: [MaterialModule, BrowserAnimationsModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuctionsLiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
