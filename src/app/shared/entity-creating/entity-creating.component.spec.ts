import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EntityCreatingComponent } from './entity-creating.component';

describe('EntityCreatingComponent', () => {
  let component: EntityCreatingComponent;
  let fixture: ComponentFixture<EntityCreatingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EntityCreatingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EntityCreatingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
