import { TestBed, inject } from '@angular/core/testing';

import { CacheMapAssociativoService } from './cache-map-associativo.service';

describe('CacheMapAssociativoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CacheMapAssociativoService]
    });
  });

  it('should be created', inject([CacheMapAssociativoService], (service: CacheMapAssociativoService) => {
    expect(service).toBeTruthy();
  }));
});
