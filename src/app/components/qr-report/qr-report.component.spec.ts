import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QrReportComponent } from './qr-report.component';

describe('QrReportComponent', () => {
  let component: QrReportComponent;
  let fixture: ComponentFixture<QrReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QrReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QrReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
