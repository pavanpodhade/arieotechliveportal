import { Component, OnInit, ViewChild } from '@angular/core';
import { Department } from 'src/models/Department';
import { DepartmentserviceService } from 'src/service/departmentservice.service';
import { ConfirmationService, MessageService } from 'primeng/api';

import { DepartmentCreateComponent } from './departementCreate.component';

/************************************************************************************************************************************************* */
@Component({
    selector: 'department-list',
    templateUrl: './departmentList.component.html',
    providers: [MessageService, ConfirmationService]
})
/************************************************************************************************************************************************* */
export class DepartmentListComponent implements OnInit {
    DepartmentList: Department[] = []
    Loading: boolean = false;
    LoadingText: string = '';
    ShowCreateDepartment: boolean = false;
    PopupTitle: string = '';
    DepartmentToSave: Department = new Department();
   

    /************************************************************************************************************************************************* */
    @ViewChild('employeeTable') employeeTable: any;
    @ViewChild('createDepartmentComp') createDepartmentComp?: DepartmentCreateComponent;

/************************************************************************************************************************************************* */

    constructor(private departmentDatService: DepartmentserviceService, private messageService: MessageService,private ConfirmationService:ConfirmationService) { }
/************************************************************************************************************************************************* */
    ngOnInit() {
        this.loadDepartment();
        this.ShowCreateDepartment = false;
        // this.departmentDatService.getDepartment().subscribe(data => {
        //     console.warn("data", data);
        //     this.DepartmentList = data;
        // });

    }
    /************************************************************************************************************************************************* */
    onCreatedDepartmentCloseEvent(event:any){
        this.ShowCreateDepartment=false;
        this.loadDepartment();
    }
    // createdDepartmentEvent(){

    // }
   
    onCreatedDepartmentEvent(event :any){

    }
  
    onDepartmentCreateCloseEventClick() {
        this.ShowCreateDepartment = false;
    }
    /************************************************************************************************************************************************* */
    loadDepartment() {

        this.Loading = true;
        this.LoadingText = "Loading Department";

        this.departmentDatService.getDepartment().subscribe(data => {

            this.DepartmentList = data;
            console.warn(this.DepartmentList);
            this.Loading = false;
        });

    }
    /************************************************************************************************************************************************* */
    onCreateClick() {
        if (this.createDepartmentComp != null || this.createDepartmentComp != undefined) {         
            this.createDepartmentComp.initUI(0);
            this.PopupTitle = "Create Department";
         this.ShowCreateDepartment = true;
         }
    }
    /************************************************************************************************************************************************* */
    onRefreshClick() {
        this.loadDepartment();
        this.Loading = true;
        this.LoadingText = "Loading Department";
    }
    /************************************************************************************************************************************************* */

    onDepartmentCreatedEvent(mode: string) {
        if (mode == "C") {
            this.ShowCreateDepartment = false;
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Department created!' });
            this.loadDepartment();
        }
        {
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Department saved!' });
            this.loadDepartment();
        }
    }
/************************************************************************************************************************************************* */
    onDepartmentCreateCloseEvent(event: any) {
        this.ShowCreateDepartment = false;
    }
/************************************************************************************************************************************************* */
    onEditClick(departmentID: number) {
        this.PopupTitle = "Edit employee";
        if (this.createDepartmentComp != null || this.createDepartmentComp != undefined) {
            this.createDepartmentComp?.initUI(departmentID);
            this.ShowCreateDepartment = true;
        }
    }
    onDeleteClick(DepartmentToSave:Department, event: Event) {
       
        this.ConfirmationService.confirm({
            message: 'Do you want to delete this employee?',
            header: 'Delete Confirmation',
            icon: 'pi pi-info-circle',
            accept: () => {
                this.Loading = true;
                this.LoadingText = "Deleteing employee";
                this.departmentDatService.StatusbyDeactivate(DepartmentToSave).subscribe(data => {

                    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Employee Deactivated!' });
                    this.Loading = false;
                    this.loadDepartment();

                    this.Loading = false;
                }, (error: any) => {
                    this.Loading = false;
                    this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error while Deactivated employee' });
                }
                );

            },
            reject: () => {

            }
        });
    }



}