import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DiaOverlayComponent } from './dia-overlay.component';

describe('DiaOverlayComponent', () => {
  let component: DiaOverlayComponent;
  let fixture: ComponentFixture<DiaOverlayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiaOverlayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiaOverlayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
