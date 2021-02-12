import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';

import { SharedModule } from 'src/app/shared/shared.module';
import { SecondsToDhmsPipe } from '../pipes/seconds-to-dhms.pipe';
import { AuctionsComponent } from './auctions.component';

describe('AuctionsComponent', () => {
  let component: AuctionsComponent;
  let fixture: ComponentFixture<AuctionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, SharedModule, BrowserAnimationsModule],
      declarations: [AuctionsComponent, SecondsToDhmsPipe],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuctionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
