import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ElecationSourceDataPageComponent } from './elecation-source-data-page.component';

describe('ElecationSourceDataPageComponent', () => {
  let component: ElecationSourceDataPageComponent;
  let fixture: ComponentFixture<ElecationSourceDataPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ElecationSourceDataPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ElecationSourceDataPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
