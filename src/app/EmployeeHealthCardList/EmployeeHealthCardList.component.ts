import { Component, OnInit, ViewChild } from '@angular/core';
import{EmployeeHC} from 'src/models/EmployeeHC';
import{EmployeeHcServiceService} from 'src/service/employeeHcService.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { EmployeehealthCardCreateComponent } from '../EmployeehealthCardCreate/EmployeehealthCardCreate.component';



@Component({
  selector: 'app-EmployeeHealthCardList',
  templateUrl: './EmployeeHealthCardList.component.html',
  styleUrls: ['./EmployeeHealthCardList.component.scss'],
  providers: [MessageService, ConfirmationService]
})
/*************************************************************************************************************************************************************************/
export class EmployeeHealthCardListComponent implements OnInit {
  employeeHcList:EmployeeHC[]=[];
  Loading: boolean = false;
  LoadingText: string = '';
  ShowCreateEmployeeHC: boolean = false;
  PopupTitle: string = '';
  EmployeeHCToSave: string = "";
  
  @ViewChild('employeeTable') employeeTable: any;
  @ViewChild('createEmployeeHCComp') CreateEmployeeHCComp?:EmployeehealthCardCreateComponent
  constructor(private employeeHcServiceService:EmployeeHcServiceService,private messageService: MessageService,private ConfirmationService:ConfirmationService) { }
/**************************************************************************************************************************************************************/
  ngOnInit() {
    this.loadEmployeeHC();
    this.ShowCreateEmployeeHC=false;
  }
/**************************************************************************************************************************************************************/
  loadEmployeeHC() {
    this.Loading = true;
    this.LoadingText = "Loading EmployeeHC";
    this.employeeHcServiceService.getEmployeeHC().subscribe(data=>{
      this.employeeHcList=data;
      console.log(this.employeeHcList);
      this.Loading = false;

    })
}
/**************************************************************************************************************************************************************/
onCreateClick()
{

 if (this.CreateEmployeeHCComp != null || this.CreateEmployeeHCComp != undefined) {         
  this.CreateEmployeeHCComp.initUI(0);
  this.PopupTitle = "Create Employee Health Card";
  this.ShowCreateEmployeeHC = true;
}
 

}
/**************************************************************************************************************************************************************/
onEditClick(empHealthCardID: number)
{
  if (this.CreateEmployeeHCComp != null || this.CreateEmployeeHCComp != undefined) {
   // alert("into")
    this.CreateEmployeeHCComp?.initUI(empHealthCardID);
  this.ShowCreateEmployeeHC=true;
  this.PopupTitle="Edit EmployeeHealth Card";
  }
}
/**************************************************************************************************************************************************************/
onRefreshClick()
{
  this.loadEmployeeHC();
}

createdEmployeeHCEvent(event :any)
{

}
onCreatedEmployeeHCEvent(event :any)
{



}
onCreatedEmployeeHCCloseEvent(event:any)
{
  this.ShowCreateEmployeeHC=false;
  this.loadEmployeeHC();
}

onDeleteClick(EmployeeHCToToSave:EmployeeHC, event: Event) {
       
  this.ConfirmationService.confirm({
      message: 'Do you want to delete this employee?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      accept: () => {
          this.Loading = true;
          this.LoadingText = "Deleteing employee";
          this.employeeHcServiceService.StatusbyDeactivate(EmployeeHCToToSave).subscribe(data => {

              this.messageService.add({ severity: 'success', summary: 'Success', detail: 'EmployeeHC Deactivated!' });
              this.Loading = false;
              this.loadEmployeeHC();

              this.Loading = false;
          }, (error: any) => {
              this.Loading = false;
              this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error while Deactivated employeeHC' });
          }
          );

      },
      reject: () => {

      }
  });
}



}
