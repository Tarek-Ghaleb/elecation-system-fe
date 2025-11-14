import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentUserPageComponent } from './payment-user-page.component';

describe('PaymentUserPageComponent', () => {
  let component: PaymentUserPageComponent;
  let fixture: ComponentFixture<PaymentUserPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaymentUserPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaymentUserPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
