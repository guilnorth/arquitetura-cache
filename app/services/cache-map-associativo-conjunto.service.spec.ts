import { TestBed, inject } from '@angular/core/testing';

import { CacheMapAssociativoConjuntoService } from './cache-map-associativo-conjunto.service';

describe('CacheMapAssociativoConjuntoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CacheMapAssociativoConjuntoService]
    });
  });

  it('should be created', inject([CacheMapAssociativoConjuntoService], (service: CacheMapAssociativoConjuntoService) => {
    expect(service).toBeTruthy();
  }));
});
