/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { EmployeeHcServiceService } from './employeeHcService.service';

describe('Service: EmployeeHcService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EmployeeHcServiceService]
    });
  });

  it('should ...', inject([EmployeeHcServiceService], (service: EmployeeHcServiceService) => {
    expect(service).toBeTruthy();
  }));
});
