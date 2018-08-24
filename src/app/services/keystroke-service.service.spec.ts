import { TestBed, inject } from '@angular/core/testing';

import { KeystrokeServiceService } from './keystroke-service.service';

describe('KeystrokeServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [KeystrokeServiceService]
    });
  });

  it('should be created', inject([KeystrokeServiceService], (service: KeystrokeServiceService) => {
    expect(service).toBeTruthy();
  }));
});
