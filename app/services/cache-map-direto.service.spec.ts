import { TestBed, inject } from '@angular/core/testing';

import { CacheMapDiretoService } from './cache-map-direto.service';

describe('CacheMapDiretoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CacheMapDiretoService]
    });
  });

  it('should be created', inject([CacheMapDiretoService], (service: CacheMapDiretoService) => {
    expect(service).toBeTruthy();
  }));
});
