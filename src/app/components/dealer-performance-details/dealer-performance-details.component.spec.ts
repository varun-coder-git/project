import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DealerPerformanceDetailsComponent } from './dealer-performance-details.component';

describe('DealerPerformanceDetailsComponent', () => {
  let component: DealerPerformanceDetailsComponent;
  let fixture: ComponentFixture<DealerPerformanceDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DealerPerformanceDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DealerPerformanceDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
