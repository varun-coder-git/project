import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DealerPerformanceComponent } from './dealer-performance.component';

describe('DealerPerformanceComponent', () => {
  let component: DealerPerformanceComponent;
  let fixture: ComponentFixture<DealerPerformanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DealerPerformanceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DealerPerformanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
