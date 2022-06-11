import { TestBed } from '@angular/core/testing';

import { CustomCarouselService } from './custom-carousel/custom-carousel.service';

describe('CustomCarouselService', () => {
  let service: CustomCarouselService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomCarouselService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
