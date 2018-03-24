import { TestBed, inject } from '@angular/core/testing';

import { HoloService } from './holo.service';

describe('HoloServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HoloService]
    });
  });

  it('should be created', inject([HoloService], (service: HoloService) => {
    expect(service).toBeTruthy();
  }));
});
