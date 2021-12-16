/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { DepartmentserviceService } from './departmentservice.service';

describe('Service: Departmentservice', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DepartmentserviceService]
    });
  });

  it('should ...', inject([DepartmentserviceService], (service: DepartmentserviceService) => {
    expect(service).toBeTruthy();
  }));
});
