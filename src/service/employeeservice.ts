import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Employee } from 'src/models/employee';

@Injectable({ providedIn: 'root' })
export class EmployeeDataService {
    constructor(private http: HttpClient) { }

    getEmployee(): Observable<Employee[]> {
        return this.http.get<Employee[]>(environment.APIURL + 'GetAllEmployees');
    }

    getEmployeeById(id: number): Observable<Employee> {
        return this.http.get<Employee>(environment.APIURL + `getemployee/${id}`);
    }
    deleteEmployee(id: number): Observable<object> {
        return this.http.delete<object>(environment.APIURL + `Employee/Delete/${id}` );
    }

    createEmployee(employeeToSave: Employee): Observable<object> {
       
        return this.http.post<Employee>(environment.APIURL + 'insertEmployees', employeeToSave);
      
    }

    updateEmployee(employeeToSave: Employee): Observable<object> {
        return this.http.put<Employee>(environment.APIURL + `api/Employee/EditEmployee?Id=${employeeToSave.id}`, employeeToSave);
      }
      
      StatusbyDeactivate(id: Employee): Observable<object> {
        return this.http.put<Employee>(environment.APIURL + `api/Employee/DeactivateEmployee?id=${id}`,{});
      }
      uploadImage(): Observable<object> {
        const headers = { 'content-type': 'application/json'}  
        return this.http.post<Employee>('https://localhost:44345/api/Employee/Imagesupload',{}, { 'headers': headers });
      
    }

    
}