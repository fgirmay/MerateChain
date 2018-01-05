import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LandListComponent } from './land-list.component';

describe('LandListComponent', () => {
  let component: LandListComponent;
  let fixture: ComponentFixture<LandListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LandListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LandListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
