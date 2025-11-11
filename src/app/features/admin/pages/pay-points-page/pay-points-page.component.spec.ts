import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PayPointsPageComponent } from './pay-points-page.component';

describe('PayPointsPageComponent', () => {
  let component: PayPointsPageComponent;
  let fixture: ComponentFixture<PayPointsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PayPointsPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PayPointsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
