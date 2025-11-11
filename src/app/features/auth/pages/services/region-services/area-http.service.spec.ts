import { TestBed } from '@angular/core/testing';

import { AreaHttpService } from './area-http.service';

describe('RegionHttpService', () => {
  let service: AreaHttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AreaHttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
