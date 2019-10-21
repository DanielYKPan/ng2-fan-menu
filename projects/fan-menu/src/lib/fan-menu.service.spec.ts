import { TestBed } from '@angular/core/testing';

import { FanMenuService } from './fan-menu.service';

describe('FanMenuService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FanMenuService = TestBed.get(FanMenuService);
    expect(service).toBeTruthy();
  });
});
