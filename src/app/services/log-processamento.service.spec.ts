import { TestBed, inject } from '@angular/core/testing';

import { LogProcessamentoService } from './log-processamento.service';

describe('LogProcessamentoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LogProcessamentoService]
    });
  });

  it('should be created', inject([LogProcessamentoService], (service: LogProcessamentoService) => {
    expect(service).toBeTruthy();
  }));
});
