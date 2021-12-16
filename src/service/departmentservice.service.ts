import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { observable, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Department } from 'src/models/Department'

@Injectable({
  providedIn: 'root'
})
export class DepartmentserviceService {

constructor(private http: HttpClient) {}

  getDepartment()
  {
    return this.http.get<Department[]>(environment.APIURL+'GetAllDepartment');
  }

   getDepartmentById(id: number): Observable<Department> {
        return this.http.get<Department>(environment.APIURL + `GetDepartmentById/${id}`);
    }
    createEmployee(DepartmentToSave: Department): Observable<object> {
      return this.http.post<Department>(environment.APIURL + 'InsertIntoDepartment', DepartmentToSave);
  }
  updateEmployee(DepartmentToSave: Department): Observable<object> {
    return this.http.put<Department>(environment.APIURL + `api/Department/UpdatedDepartment?DepartmentID=${DepartmentToSave.departmentID}`, DepartmentToSave);
}

StatusbyDeactivate(DepartmentToSave: Department): Observable<object> {
  return this.http.put<Department>(environment.APIURL + `Deletebydeactivate?DepartmentID=${DepartmentToSave.departmentID}`,{});
}


}




