import { TestBed } from '@angular/core/testing';

import { PointsHandlerService } from './points-handler.service';

describe('PointsHandlerService', () => {
  let service: PointsHandlerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PointsHandlerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
