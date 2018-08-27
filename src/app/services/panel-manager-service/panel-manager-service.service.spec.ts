import { TestBed, inject } from '@angular/core/testing';

import { PanelManagerServiceService } from './panel-manager-service.service';

describe('PanelManagerServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PanelManagerServiceService]
    });
  });

  it('should be created', inject([PanelManagerServiceService], (service: PanelManagerServiceService) => {
    expect(service).toBeTruthy();
  }));
});
