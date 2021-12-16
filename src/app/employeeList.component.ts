import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Employee } from 'src/models/employee';
import { EmployeeDataService } from 'src/service/employeeservice';
import { EmployeeCreateComponent } from './employeeCreate.component';

@Component({
    selector: 'employee-list',
    templateUrl: './employeeList.component.html',
    providers: [MessageService, ConfirmationService]
})

export class EmployeeListComponent implements OnInit {
    EmployeeList: Employee[] = []
    Loading: boolean = false;
    LoadingText: string = '';
    ShowCreateEmployee: boolean = false;
    PopupTitle:string = '';
    @ViewChild('employeeTable') employeeTable: any;
 @ViewChild('creatEmployeeComp') createEmployeeComp?: EmployeeCreateComponent;

    constructor(private employeeDatService: EmployeeDataService, private messageService: MessageService, private confirmationService: ConfirmationService) { }

    ngOnInit() {
        this.loadEmployee();
        this.ShowCreateEmployee = false;

    }

    loadEmployee() {
        this.Loading = true;
        this.LoadingText = "Loading employees";
        this.employeeDatService.getEmployee().subscribe(data => {

         this.EmployeeList = data;
          //  console.log( this.EmployeeList = data)
            this.Loading = false;

        }, (error: any) => {
            this.Loading = false;
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error while loading employee' });
        }
        );
    }
    onEmployeeCreatedEvent(mode: string) {
      
        if(mode == "C")
        {
            this.ShowCreateEmployee = false;
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Employee created!' });
            this.loadEmployee();
        }
        {          
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Employee saved!' });
            this.loadEmployee();
        }
     
    }

    onEmployeeCreateCloseEvent(event: any) {
        this.ShowCreateEmployee = false;
        this.loadEmployee();
    }
    onCreateClick() {
        if (this.createEmployeeComp != null || this.createEmployeeComp != undefined) {
            this.createEmployeeComp.initUI(0);
            this.PopupTitle = "Create employee";
            this.ShowCreateEmployee = true;
        }
    }

    onEditClick(id: number) {
        if (this.createEmployeeComp != null || this.createEmployeeComp != undefined) {
            this.createEmployeeComp.initUI(id);
            this.PopupTitle = "Edit employee";
            this.ShowCreateEmployee = true;
        }
    }
    onRefreshClick() {
        this.loadEmployee();

    }
    onDeleteClick(id:Employee, event: Event) {
        this.confirmationService.confirm({
            message: 'Do you want to delete this employee?',
            header: 'Delete Confirmation',
            icon: 'pi pi-info-circle',
            accept: () => {
                this.Loading = true;
                this.LoadingText = "Deleteing employee";
                alert(id)
                this.employeeDatService.StatusbyDeactivate(id).subscribe(data => {
                    alert("hi")
                    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Employee deleted!' });
                    this.Loading = false;
                    this.loadEmployee();

                    this.Loading = false;
                }, (error: any) => {
                    this.Loading = false;
                    this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error while deleteing employee' });
                }
                );

            },
            reject: () => {

            }
        });
    }
}