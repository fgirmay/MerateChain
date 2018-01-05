import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LandItemComponent } from './land-item.component';

describe('LandItemComponent', () => {
  let component: LandItemComponent;
  let fixture: ComponentFixture<LandItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LandItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LandItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
