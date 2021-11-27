import { TestBed } from '@angular/core/testing';

import { ComunicateBackEndService } from './comunicate-back-end.service';

describe('ComunicateBackEndService', () => {
  let service: ComunicateBackEndService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ComunicateBackEndService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
