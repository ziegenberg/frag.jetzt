import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IoSliderComponent } from './io-slider.component';

describe('IoSliderComponent', () => {
  let component: IoSliderComponent;
  let fixture: ComponentFixture<IoSliderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IoSliderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IoSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
