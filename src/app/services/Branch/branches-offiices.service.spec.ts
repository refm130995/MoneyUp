import { TestBed } from '@angular/core/testing';

import { BranchesOffiicesService } from './branches-offiices.service';

describe('BranchesOffiicesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BranchesOffiicesService = TestBed.get(BranchesOffiicesService);
    expect(service).toBeTruthy();
  });
});
