import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'page-header',
    templateUrl: './pageheader.component.html'
})

export class PageHeaderComponent implements OnInit {
    constructor() { }
    
    @Input()
    title:string = ''

    ngOnInit() {

        //this.title = "Employee List";
     }
}