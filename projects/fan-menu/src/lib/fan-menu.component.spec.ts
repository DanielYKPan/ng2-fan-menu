import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FanMenuComponent } from './fan-menu.component';

describe('FanMenuComponent', () => {
  let component: FanMenuComponent;
  let fixture: ComponentFixture<FanMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FanMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FanMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
