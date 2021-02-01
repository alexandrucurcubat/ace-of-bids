import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuctionsLiveComponent } from './auctions-live.component';

describe('AuctionsLiveComponent', () => {
  let component: AuctionsLiveComponent;
  let fixture: ComponentFixture<AuctionsLiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuctionsLiveComponent ]
    })
    .compileComponents();
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
