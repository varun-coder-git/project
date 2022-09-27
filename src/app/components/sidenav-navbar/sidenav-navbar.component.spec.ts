import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidenavNavbarComponent } from './sidenav-navbar.component';

describe('SidenavNavbarComponent', () => {
  let component: SidenavNavbarComponent;
  let fixture: ComponentFixture<SidenavNavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SidenavNavbarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SidenavNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
