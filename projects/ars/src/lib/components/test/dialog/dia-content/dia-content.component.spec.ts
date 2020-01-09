import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DiaContentComponent } from './dia-content.component';

describe('DiaContentComponent', () => {
  let component: DiaContentComponent;
  let fixture: ComponentFixture<DiaContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiaContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiaContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
