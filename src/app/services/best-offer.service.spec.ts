import { TestBed } from '@angular/core/testing';

import { BestOfferService } from './best-offer.service';

describe('BestOfferService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BestOfferService = TestBed.get(BestOfferService);
    expect(service).toBeTruthy();
  });
});
