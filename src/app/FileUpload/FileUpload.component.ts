import { Component, OnInit } from '@angular/core';

import { FileToUpload } from './../../models/FileToUpload';
import { HttpClient } from '@angular/common/http';

import { MessageService } from 'primeng/api';
import { FileUploadService } from 'src/service/FileUploadService';
// import { ProfileModel } from 'src/app/models/ProfileModel';
import { FormBuilder} from '@angular/forms';

@Component({
  selector: 'app-FileUpload',
  templateUrl: './FileUpload.component.html',
  styleUrls: ['./FileUpload.component.scss']
})
export class FileUploadComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
