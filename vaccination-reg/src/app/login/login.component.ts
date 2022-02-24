import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Data } from '../models/data';
import { DatastoreService } from '../service/datastore.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  people:Data=new Data();

  constructor(private dataStore: DatastoreService,private router:Router) { }

  ngOnInit(): void {
  }
  msg:any=undefined;
  errMsg:any=undefined;
  success=false;
  isHit=false;
  onLogin(){
    this.dataStore.logIn(this.people).subscribe(
      (data)=>{
        this.msg="Added";
        this.errMsg=undefined;
        this.router.navigate(['/user',this.people.email]);
      },
      (error)=>{
        this.msg=undefined;
        this.errMsg="Not added"//JSON.stringify(error.error);
      }
    )
    // let data:Data = this.dataStore.matchData(this.people.email);
    // if(data.email == this.people.email && data.password == this.people.password){
    //   this.success = true;
    //   this.router.navigate(['/user',this.people.email]);
    // }
    // else{
    //   this.success = false;
    //   this.isHit = true;
    // }
  }
}
