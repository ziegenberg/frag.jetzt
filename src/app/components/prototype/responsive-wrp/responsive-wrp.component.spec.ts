import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResponsiveWrpComponent } from './responsive-wrp.component';

describe('ResponsiveWrpComponent', () => {
  let component: ResponsiveWrpComponent;
  let fixture: ComponentFixture<ResponsiveWrpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResponsiveWrpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResponsiveWrpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
