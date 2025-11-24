import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GatherSourceDataPageComponent } from './gather-source-data-page.component';

describe('GatherSourceDataPageComponent', () => {
  let component: GatherSourceDataPageComponent;
  let fixture: ComponentFixture<GatherSourceDataPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GatherSourceDataPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GatherSourceDataPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
