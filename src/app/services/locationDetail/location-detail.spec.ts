import { TestBed } from '@angular/core/testing';

import { LocationDetail } from './location-detail';

describe('LocationDetail', () => {
  let service: LocationDetail;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LocationDetail);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
