import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LandDetailComponent } from './land-detail.component';

describe('LandDetailComponent', () => {
  let component: LandDetailComponent;
  let fixture: ComponentFixture<LandDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LandDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LandDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
