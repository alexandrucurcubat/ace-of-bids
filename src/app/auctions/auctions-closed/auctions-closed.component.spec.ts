import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuctionsClosedComponent } from './auctions-closed.component';

describe('AuctionsClosedComponent', () => {
  let component: AuctionsClosedComponent;
  let fixture: ComponentFixture<AuctionsClosedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuctionsClosedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuctionsClosedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
