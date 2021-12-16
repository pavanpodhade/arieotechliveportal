import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { FileToUpload } from 'src/models/FileToUpload';

@Injectable({ providedIn: 'root' })
export class FileUploadService {
    constructor(private http: HttpClient) { }

    
}