import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LandOwnershipComponent } from './land-ownership.component';

describe('LandOwnershipComponent', () => {
  let component: LandOwnershipComponent;
  let fixture: ComponentFixture<LandOwnershipComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LandOwnershipComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LandOwnershipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
