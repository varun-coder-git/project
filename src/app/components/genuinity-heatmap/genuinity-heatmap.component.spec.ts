import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenuinityHeatmapComponent } from './genuinity-heatmap.component';

describe('GenuinityHeatmapComponent', () => {
  let component: GenuinityHeatmapComponent;
  let fixture: ComponentFixture<GenuinityHeatmapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GenuinityHeatmapComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GenuinityHeatmapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
