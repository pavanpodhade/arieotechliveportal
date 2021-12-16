
import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MessageService } from 'primeng/api';
import { EmployeeHC } from 'src/models/EmployeeHC';
import { EmployeeHcServiceService } from 'src/service/employeeHcService.service';

@Component({
  selector: 'app-EmployeehealthCardCreate',
  templateUrl: './EmployeehealthCardCreate.component.html',
  styleUrls: ['./EmployeehealthCardCreate.component.scss']
})
/**********************************************************************************************************/
export class EmployeehealthCardCreateComponent implements OnInit {
 @Output()  createdEmployeeHCEvent = new EventEmitter<string>();
  @Output() CreatedEmployeeHCCloseEvent = new EventEmitter<string>();

  EmployeeHealthcardToSave:EmployeeHC=new EmployeeHC();
  ErrorMessage:string = '';
  Saving: boolean = false;
  Loading:boolean = false;
  LoadingText: string = '';
  mode:string ='';
  constructor(private http: HttpClient,private EmployeeHcDataService:EmployeeHcServiceService,private messageservice: MessageService,) { }

  ngOnInit() {
    this. EmployeeHealthcardToSave =new EmployeeHC(); 
  }
  /*********************************************************************************************************************************/
  onSaveClick()
  {
    if(this.validateEmployeeHC())
    {
        if (this.mode == 'E')
        {
         this.UpdateEmployeeHC();
        }
        else{
       
            this.Saving = true;
            this.LoadingText = "Saving EmployeeHealthCared";
            this.EmployeeHcDataService.createEmployee(this.EmployeeHealthcardToSave).subscribe((data:any) => {  
                let tmp:any = data;

                this.EmployeeHealthcardToSave= new EmployeeHC();
                this.Saving = false;
              this.messageservice.add({ severity: 'success', summary: 'Success', detail: 'EmployeeHealthCared created!' });
                this.CreatedEmployeeHCCloseEvent.emit("");
        },(error:any)=>{
            if(error.status == 409){
                this.ErrorMessage = "EmployeeHealthCared with name already exists!";
            }else{
                this.ErrorMessage = "Error while creating EmployeeHealthCared!!";
            }
            this.Saving = false;
        });
    }
    }



  }

  UpdateEmployeeHC() {
    this.EmployeeHcDataService.updateEmployeeHC(this.EmployeeHealthcardToSave).subscribe((data:any) => {
        let tmp:any = data;  
      this.Saving = false;
      this.messageservice.add({ severity: 'success', summary: 'Success', detail: 'EmployeeHealthCared updated!' });
      this.CreatedEmployeeHCCloseEvent.emit("");
    }, error => {
      if (error.status == 409) {
        this.ErrorMessage = "EmployeeHealthCard already exists";
      }
      else {
        this.ErrorMessage = "Unknown error";
      }
      this.Loading = false;
      this.Saving = false;
    });
  }

  initUI(id:number)
  { 
    // console.log(id)
      this.ErrorMessage = '';
      if(id == 0){  
          this.EmployeeHealthcardToSave= new EmployeeHC();
          this.mode = "C";
      }
      else{
          // console.log(id)
          this.EmployeeHealthcardToSave= new EmployeeHC();
          this.mode = "E";
          this.Loading = true;
          this.EmployeeHcDataService.getEmployeehcById(id).subscribe(data =>{

                  this.EmployeeHealthcardToSave = data;
             
                  this.Loading = false;
          },error=>{
              this.ErrorMessage = "Error while getting EmployeeHealthCared details";
          });
          //Pull employee id id
      }
  }
  validateEmployeeHC():boolean{
    let valid = true;
    this.ErrorMessage = '';
    if(this.EmployeeHealthcardToSave.first_Name?.trim() == '')
    {
        this.ErrorMessage = 'Please enter First Name';
        return false;
    }
    if(this.EmployeeHealthcardToSave.last_Name?.trim() == '')
    {
        this.ErrorMessage = 'Please enter Last Name';
        return false;
    }     
  if(this.EmployeeHealthcardToSave.relation?.trim()=='')
  {
    this.ErrorMessage='Please enter Relation';
    return false;
  }
    if(this.EmployeeHealthcardToSave.adharCard_No?.trim() == '')
    {
        this.ErrorMessage = 'Please enter AdharCard No ';
        return false;
    }
    return valid;
}

onCloseClick() {
  this.CreatedEmployeeHCCloseEvent.emit("");  
}
}
