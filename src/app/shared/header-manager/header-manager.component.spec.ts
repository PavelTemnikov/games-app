import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderManagerComponent } from './header-manager.component';

describe('EntityHeaderComponent', () => {
  let component: HeaderManagerComponent;
  let fixture: ComponentFixture<HeaderManagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeaderManagerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});