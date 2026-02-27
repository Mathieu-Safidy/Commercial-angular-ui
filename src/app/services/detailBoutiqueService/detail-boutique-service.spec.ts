import { TestBed } from '@angular/core/testing';

import { DetailBoutiqueService } from './detail-boutique-service';

describe('DetailBoutiqueService', () => {
  let service: DetailBoutiqueService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DetailBoutiqueService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
