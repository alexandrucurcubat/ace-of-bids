import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuctionsGridComponent } from './auctions-grid.component';

describe('AuctionsGridComponent', () => {
  let component: AuctionsGridComponent;
  let fixture: ComponentFixture<AuctionsGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuctionsGridComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuctionsGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
