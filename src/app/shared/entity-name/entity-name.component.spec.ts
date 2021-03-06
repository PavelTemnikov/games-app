import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EntityNameComponent } from './entity-name.component';

describe('LinkToEntityComponent', () => {
  let component: EntityNameComponent;
  let fixture: ComponentFixture<EntityNameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EntityNameComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EntityNameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
