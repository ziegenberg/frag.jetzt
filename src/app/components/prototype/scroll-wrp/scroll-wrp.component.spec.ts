import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScrollWrpComponent } from './scroll-wrp.component';

describe('ScrollWrpComponent', () => {
  let component: ScrollWrpComponent;
  let fixture: ComponentFixture<ScrollWrpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScrollWrpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScrollWrpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
