import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Department } from 'src/models/Department';
import { DepartmentserviceService } from 'src/service/departmentservice.service';
import { MessageService } from 'primeng/api';
// import {validator} from 'validator/lib/isAlpha';
/************************************************************************************************************************************************* */
@Component({
    selector: 'departement-create',
    templateUrl: './departementCreate.component.html'
})
/************************************************************************************************************************************************* */
export class  DepartmentCreateComponent  implements OnInit {
    @Output()  createdDepartmentEvent = new EventEmitter<string>();
    @Output() CreatedDepartmentCloseEvent = new EventEmitter<string>();
    DepartmentToSave: Department =new Department();
 
    ErrorMessage:string = '';
    Saving: boolean = false;
    Loading:boolean = false;
    LoadingText: string = '';
    mode:string ='';
   
    constructor(private http: HttpClient,private DepartmentDataService:DepartmentserviceService,private messageservice: MessageService,) { }

    ngOnInit() { 
        this. DepartmentToSave =new Department();       
    }

  
    keyPressNumbers(event:any) {
        var charCode = (event.which) ? event.which : event.keyCode;
        // Only Numbers 0-9
        if ((charCode < 48 || charCode > 57)) {
          event.preventDefault();
          return false;
        } else {
          return true;
        }
      }
  /************************************************************************************************************************************************* */
    initUI(id:number)
    { 
       console.log(id)
        this.ErrorMessage = '';
        if(id == 0){  
            this.DepartmentToSave= new Department();
            this.mode = "C";
        }
        else{
             console.log(id)
            this.DepartmentToSave= new Department();
            this.mode = "E";
            this.Loading = true;
            this.DepartmentDataService.getDepartmentById(id).subscribe(data =>{
                    this.DepartmentToSave = data;
                    this.Loading = false;
            },error=>{
                this.ErrorMessage = "Error while getting Department details";
            });
            //Pull employee id id
        }
    }
    /************************************************************************************************************************************************* */
    Updatedepartmet() {
        this.DepartmentDataService.updateEmployee(this.DepartmentToSave).subscribe((data:any) => {
            let tmp:any = data;  
          this.Saving = false;
          this.messageservice.add({ severity: 'success', summary: 'Success', detail: 'Department updated!' });
          this.CreatedDepartmentCloseEvent.emit("");
        }, error => {
          if (error.status == 409) {
            this.ErrorMessage = "Department already exists";
          }
          else {
            this.ErrorMessage = "Unknown error";
          }
          this.Loading = false;
          this.Saving = false;
        });
      }

/************************************************************************************************************************************************* */
    onSaveClick() {
        if(this.validateEmployee())
        {
            if (this.mode == 'E')
            {
             this.Updatedepartmet();
            }
            else{
                this.Saving = true;
                this.LoadingText = "Saving Department";
                this.DepartmentDataService.createEmployee(this.DepartmentToSave).subscribe((data:any) => {  
                    let tmp:any = data;
                    this.DepartmentToSave= new Department();
                    this.Saving = false;
                  this.messageservice.add({ severity: 'success', summary: 'Success', detail: 'Department created!' });
                    this.CreatedDepartmentCloseEvent.emit("");
            },(error:any)=>{
                if(error.status == 409){
                    this.ErrorMessage = "Department with name already exists!";
                }else{
                    this.ErrorMessage = "Error while creating Department!!";
                }
                this.Saving = false;
            });
        }
        }
    }
/************************************************************************************************************************************************* */
    validateEmployee():boolean{
        let valid = true;
        this.ErrorMessage = '';

        if(this.DepartmentToSave.departmentName.trim() == '')
        {
            this.ErrorMessage = 'Please enter Department Name';
            return false;
        }
        if(this.DepartmentToSave.departmentDescription?.trim() == '')
        {
            this.ErrorMessage = 'Please enter Description';
            return false;
        }     
        if(this.DepartmentToSave.departmentHead?.trim() == '')
        {
            this.ErrorMessage = 'Please enter Description Head';
            return false;
        }
        if(this.DepartmentToSave.createdBy?.trim() == '')
        {
            this.ErrorMessage = 'Please enter CreatedBy ';
            return false;
        }
        return valid;
    }
    /************************************************************************************************************************************************* */
    onCloseClick() {
        this.CreatedDepartmentCloseEvent.emit("");  
    }
   

}