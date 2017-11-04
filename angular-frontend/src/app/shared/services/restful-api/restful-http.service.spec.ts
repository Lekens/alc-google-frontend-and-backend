import { TestBed, inject } from '@angular/core/testing';

import { RestfulHttpService } from './restful-http.service';

describe('RestfulHttpService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RestfulHttpService]
    });
  });

  it('should be created', inject([RestfulHttpService], (service: RestfulHttpService) => {
    expect(service).toBeTruthy();
  }));
});
