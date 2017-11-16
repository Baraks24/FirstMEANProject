import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { XoVsPlayerComponent } from './xo-vs-player.component';

describe('XoVsPlayerComponent', () => {
  let component: XoVsPlayerComponent;
  let fixture: ComponentFixture<XoVsPlayerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ XoVsPlayerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(XoVsPlayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
