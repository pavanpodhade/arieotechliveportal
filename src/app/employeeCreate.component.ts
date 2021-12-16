import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output, ViewChild, ElementRef } from '@angular/core';
import { Employee } from 'src/models/employee';
import { GenderList } from 'src/models/genderlist';
import { EmployeeDataService } from 'src/service/employeeservice';
import { TabViewModule } from 'primeng/tabview';
import { MessageService } from 'primeng/api';
import { Department } from 'src/models/Department';
import { DepartmentserviceService } from 'src/service/departmentservice.service';
import { analyzeAndValidateNgModules } from '@angular/compiler';
// import { request } from 'https';
declare var require: any;

@Component({
    selector: 'employee-create',
    templateUrl: './employeeCreate.component.html'
})

export class EmployeeCreateComponent implements OnInit {

    @Output() employeeCreatedEvent = new EventEmitter<string>();
    @Output() employeeCreateCloseEvent = new EventEmitter<string>();
    DepartmentList: Department[] = []
    EmployeeToSave: Employee = new Employee();
    DepartmentToSave: Department = new Department();


    GenderList: GenderList[] = [
        { name: 'Male', code: 'M' },
        { name: 'Female', code: 'F' }
    ];
    // require: any;
    ErrorMessage: string = '';
    selectedFile: any;
    selectedFormFile: any;
    Saving: boolean = false;
    Loading: boolean = false;
    LoadingText: string = '';
    mode: string = '';
    PopupTitle: string = '';
    isUserActive: boolean = true;
    isUserpassport: boolean = false;
    deptname: string = '';
    constructor(private http: HttpClient, private employeeDataService: EmployeeDataService, private messageService: MessageService, private DepartmentserviceService: DepartmentserviceService) { }


    ngOnInit() {
        this.EmployeeToSave = new Employee();
        this.departmentGet();

    }
    //************************************************************************images code************************************************************************
    urllink: string = "assets/img/image-icon.png";

    selectFiles(event: any) {
        if (event.target.files) {
            var reader = new FileReader()
            reader.readAsDataURL(event.target.files[0]);
            reader.onload = (event: any) => {
                this.urllink = event.target.result

                this.EmployeeToSave.ImagesPath = this.urllink;

            }
        }

        this.selectFiles = event.target.files[0];
        // this.selectedFormFile=event.target.files;
        console.log(this.selectFiles = event.target.files[0]);
        // var axios = require('axios');
        // var FormData = require('form-data');
        // var data = new FormData();


        // var config = {
        //   method: 'post',
        //   url: 'https://localhost:44345/api/Employee/Imagesupload',
        //   headers: { 

        //   },
        //   data :  event.target.files[0]
        // };

        // axios(config)
        // .then( (response:any)=> {
        //   console.log(JSON.stringify(response.data));
        // })
        // .catch( (error:any)=> {
        //   console.log(error);
        // });
    }
    //*************************************************************************************************************************************** */
    // onfileselected(event: any) {
    //     // this.selectfile=<File>event.target.files[0];

    // }
    onUpload() {

        const fd = new FormData();
        const string = JSON.stringify(this.selectFiles);
        const bytes = new TextEncoder().encode(string);
        const blob = new Blob([bytes], {
            type: "application/json;charset=utf-8"
        })
        fd.append('newfile', blob, this.selectFiles.name)


        var axios = require('axios');


        var config = {
            method: 'post',
            url: 'https://localhost:44345/api/Employee/Imagesupload',
            headers: {

            },
            data: fd
        };

        axios(config)
            .then((response: any) => {
                console.log(JSON.stringify(response.data));
            })
            .catch((error: any) => {
                console.log(error);
            });
        alert("Photo Upload Successfully");

    }
    //*********************************************************************************************************************************************** */
    departmentGet() {

        this.DepartmentserviceService.getDepartment().subscribe(data => {
            this.DepartmentList = data;

            console.log(this.DepartmentList);

        }, error => {
            this.ErrorMessage = "Error while getting Department details";
        });

    }
    //********************************************************************************************************************************************** */ 

    initUI(id: number) {
        this.ErrorMessage = '';
        if (id == 0) {
            this.EmployeeToSave = new Employee();
            this.mode = "C";
        }
        else {

            this.EmployeeToSave = new Employee();
            this.mode = "E";
            this.Loading = true;
            this.employeeDataService.getEmployeeById(id).subscribe(data => {
                this.EmployeeToSave = data;             
                this.DepartmentToSave.departmentID = this.EmployeeToSave.departmentId;

                let dateString = this.EmployeeToSave.birthDate;
                this.EmployeeToSave.birthDate = new Date(dateString);

                let datejoiningDate = this.EmployeeToSave.joiningDate;
                this.EmployeeToSave.joiningDate = new Date(datejoiningDate);

                let motherDOBstring = this.EmployeeToSave.motherDOB;
                this.EmployeeToSave.motherDOB = new Date(motherDOBstring);


                let FatherDOBstring = this.EmployeeToSave.fatherDOB;
                this.EmployeeToSave.fatherDOB = new Date(FatherDOBstring);

                let SpouseDOBstring = this.EmployeeToSave.spouseDOB;
                this.EmployeeToSave.spouseDOB = new Date(SpouseDOBstring);

                let createonDOBstring = this.EmployeeToSave.createOn;
                this.EmployeeToSave.createOn = new Date(createonDOBstring);

                this.Loading = false;
            }, error => {

                this.ErrorMessage = "Error while getting employee details";
            });
            //Pull employee id id
        }

    }
    //*********************************************************************************************************************************************** */
    UpdateEmployee() {

        this.employeeDataService.updateEmployee(this.EmployeeToSave).subscribe((data: any) => {
            let tmp: any = data;
            this.Saving = false;
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Employee updated!' });
            this.employeeCreateCloseEvent.emit("");
        }, error => {
            if (error.status == 409) {
                this.ErrorMessage = "Employee already exists";
            }
            else {
                this.ErrorMessage = "Unknown error";
            }
            this.Loading = false;
            this.Saving = false;
        });
    }
    //*********************************************************************************************************************************************** */
    onupload1(event: any) {
        console.log(event);

        // var axios = require('axios');
        // var FormData = require('form-data');
        // var data = new FormData();
        // data.append('', '/C:/Users/pavan.podhade/Pictures/image-icon.png');

        // var config = {
        //   method: 'post',
        //   url: 'https://localhost:44345/api/Employee/Imagesupload',
        //   headers: { 
        //     ...data.getHeaders()
        //   },
        //   data : data
        // };

        // axios(config)
        // .then( (response:any)=> {
        //   console.log(JSON.stringify(response.data));
        // })
        // .catch( (error:any)=> {
        //   console.log(error);
        // });


    }
    onSaveClick() {
        this.PopupTitle = "Create Employee";
        if (this.validateEmployee()) {
            if (this.mode == 'E') {
                this.UpdateEmployee();
            }
            else {

                //     if(this.isUserActive)
                //     {
                //       this.EmployeeToSave.active=true
                //     }
                // else{
                //     this.EmployeeToSave.active=false;
                //     } 

                if (this.isUserpassport) {
                    this.EmployeeToSave.passport = true
                }
                else {
                    this.EmployeeToSave.passport = false;
                }



                this.employeeDataService.createEmployee(this.EmployeeToSave).subscribe((data: any) => {
                    //  console.log(data);
                    let tmp: any = data;
                    this.EmployeeToSave = new Employee();
                    // this.selectFiles.name
                    this.Saving = false;
                    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Employee save!' });
                    this.LoadingText = "Saving employee";
                    this.employeeCreateCloseEvent.emit("");
                    this.urllink = "";
                },
                    (error: any) => {
                        if (error.status == 409) {
                            this.ErrorMessage = "Employee with name already exists!";
                        } else {
                            this.ErrorMessage = "Error while creating employee!!";
                        }
                        this.Saving = false;
                    });
            }
        }
    }
    //************************************************************************************************************************************************* */
    onChangeDepartment(value: any) {
        console.log(value);
        this.EmployeeToSave.departmentId = this.DepartmentToSave.departmentID

    }
    validateEmployee(): boolean {
        let valid = true;

        this.ErrorMessage = '';
        if (this.EmployeeToSave.firstName.trim() == '') {
            this.ErrorMessage = 'Please enter first name';
            return false;
        }

        if (this.EmployeeToSave.lastName.trim() == '') {
            this.ErrorMessage = 'Please enter last name';
            return false;
        }

        if (this.EmployeeToSave.employeeCode == 0 || this.EmployeeToSave.employeeCode == null || this.EmployeeToSave.employeeCode == undefined) {
            this.ErrorMessage = 'Please enter Employee Code';
            return false;
        }

        if (this.EmployeeToSave.birthDate == null || this.EmployeeToSave.birthDate == undefined) {
            this.ErrorMessage = 'Please enter birth date';
            return false;
        }

        if (this.EmployeeToSave.gender == null || this.EmployeeToSave.gender == '' || this.EmployeeToSave.gender == undefined) {
            this.ErrorMessage = 'Please select gender';
            return false;
        }

        return valid;
    }

    onCloseClick() {
        this.employeeCreateCloseEvent.emit("");
        this.urllink = "";



    }




}
