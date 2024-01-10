import { TestBed } from '@angular/core/testing';

import { GetBallsService } from './get-balls.service';

describe('GetBallsService', () => {
  let service: GetBallsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetBallsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
