import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RescaleComponent } from './rescale.component';

describe('RescaleComponent', () => {
  let component: RescaleComponent;
  let fixture: ComponentFixture<RescaleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RescaleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RescaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
