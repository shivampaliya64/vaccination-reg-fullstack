import { Component, OnInit } from '@angular/core';
import { Data } from '../models/data';
import { DatastoreService } from '../service/datastore.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  
  people:Data=new Data();//fname,lname,dob,gender,email,password,phno,adhar
  msg:any=undefined;
  errMsg:any=undefined;

  constructor(private dataStore: DatastoreService,private router:Router) { }

  ngOnInit(): void {
    
  }

  onSubmit(){
    this.dataStore.setData(this.people).subscribe(
      (data)=>{
        this.msg="Added";
        this.errMsg=undefined;
        this.router.navigateByUrl("/login");
      },
      (error)=>{
        this.msg=undefined;
        this.errMsg="Not added"//JSON.stringify(error.error);
      }
    )
    
  }
}
