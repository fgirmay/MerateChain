import { TestBed, inject } from '@angular/core/testing';

import { LandService } from './land.service';

describe('LandService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LandService]
    });
  });

  it('should be created', inject([LandService], (service: LandService) => {
    expect(service).toBeTruthy();
  }));
});
