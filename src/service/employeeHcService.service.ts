import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { observable, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { EmployeeHC } from 'src/models/EmployeeHC';

@Injectable({
  providedIn: 'root'
})
export class EmployeeHcServiceService {

constructor(private http: HttpClient) { }
getEmployeeHC()
{

  return this.http.get<EmployeeHC[]>(environment.APIURL+'GetallEmployeeHealthCardRepository');
}

createEmployee(EmployeeHcToSave:EmployeeHC): Observable<object> {
  return this.http.post<EmployeeHC>(environment.APIURL + 'InsertIntoEmployeeHealthCard', EmployeeHcToSave);
}

getEmployeehcById(id: number): Observable<EmployeeHC> {
  return this.http.get<EmployeeHC>(environment.APIURL + `GetEmployeeHealthCardById/${id}`);
}
updateEmployeeHC(EmployeeHcToSave: EmployeeHC): Observable<object> {
  return this.http.put<EmployeeHC>(environment.APIURL + `api/Controller/UpdatedEmployeeHealthCard?EmployeeHealthCardID=${EmployeeHcToSave.empHealthCardID}`, EmployeeHcToSave);
}

StatusbyDeactivate(DepartmentToSave: EmployeeHC): Observable<object> {
  return this.http.put<EmployeeHC>(environment.APIURL + `Deletebydeactivate1?EmployeeHealthCardID=${DepartmentToSave.empHealthCardID}`,{});
}


}
 