import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegionPageComponent } from './region-page.component';

describe('RegionPageComponent', () => {
  let component: RegionPageComponent;
  let fixture: ComponentFixture<RegionPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegionPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegionPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
