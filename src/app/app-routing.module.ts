import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DepartmentListComponent } from './departmentList.component';
import { EmployeeHealthCardListComponent } from './EmployeeHealthCardList/EmployeeHealthCardList.component';
import { EmployeeListComponent } from './employeeList.component';

const routes: Routes = [
  { path: 'employee', pathMatch: 'full', component: EmployeeListComponent },
  { path: 'department', pathMatch: 'full', component: DepartmentListComponent },
  {path:'employeehealthcard',pathMatch:'full',component:EmployeeHealthCardListComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 

}
