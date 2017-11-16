import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { XoVsServerComponent } from './xo-vs-server.component';

describe('XoVsServerComponent', () => {
  let component: XoVsServerComponent;
  let fixture: ComponentFixture<XoVsServerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ XoVsServerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(XoVsServerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
