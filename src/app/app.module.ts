import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EmployeeListComponent } from './employeeList.component';
import { HttpClientModule } from '@angular/common/http';
import {TableModule} from 'primeng/table';
import { NgxSpinnerModule } from "ngx-spinner";
import {ProgressSpinnerModule} from 'primeng/progressspinner';
import { PageHeaderComponent } from './pageheader.component';
import {ToastModule} from 'primeng/toast';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DepartmentListComponent } from './departmentList.component';
import { DialogModule } from 'primeng/dialog';
import { EmployeeCreateComponent } from './employeeCreate.component';
import { FormsModule } from '@angular/forms';
import {ConfirmPopupModule} from 'primeng/confirmpopup';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { CalendarModule } from 'primeng/calendar';
import {DropdownModule} from 'primeng/dropdown';
import { DepartmentCreateComponent } from './departementCreate.component';
import { EmployeeHealthCardListComponent } from './EmployeeHealthCardList/EmployeeHealthCardList.component';
import { EmployeehealthCardCreateComponent } from './EmployeehealthCardCreate/EmployeehealthCardCreate.component';
import { AlphabetOnlyDirective } from './alphbet-only.directive';
import{OnlynumberDirective} from './Numeric-Only.directive';
import {TabViewModule} from 'primeng/tabview';
import { FileUploadComponent } from './FileUpload/FileUpload.component';

@NgModule({
  declarations: [				
    AppComponent,
    EmployeeListComponent,
    PageHeaderComponent,
    DepartmentListComponent,
    EmployeeCreateComponent,
    DepartmentCreateComponent,
      EmployeeHealthCardListComponent,
      EmployeehealthCardCreateComponent,
      AlphabetOnlyDirective,
      OnlynumberDirective,
      FileUploadComponent
   ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,    
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    TableModule,
    NgxSpinnerModule,
    ProgressSpinnerModule,
    ToastModule,
    DialogModule,
    ConfirmPopupModule,
    ConfirmDialogModule,
    CalendarModule,
    DropdownModule,
    TabViewModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
