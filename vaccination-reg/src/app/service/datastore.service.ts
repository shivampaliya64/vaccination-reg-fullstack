import { Injectable } from '@angular/core';
import { Data } from '../models/data';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DatastoreService {
  vaccinated:Data[]=[];
  curr:Data=new Data();

  users:Data[]=[];
  user:Data=new Data();

  constructor(private http:HttpClient) { }

  setData(ip: Data):Observable<any>{
    console.log("user data service:"+JSON.stringify(ip));
    return this.http.post("http://localhost:3000/signup ",ip,{responseType:'text'});
  }
  logIn(data: Data):Observable<any>{
    console.log("logging in "+JSON.stringify(data));
    return this.http.post("http://localhost:3000/login ",data,{responseType:'text'});
  }

  matchData(email:string|null):Data{
    const jsonData:string|null = localStorage.getItem('myData');
    if(jsonData){
      var data = JSON.parse(jsonData);
    }
    //getting user of the matching email
    for(let i=0;i<data.length;i++){
      if(data[i].email == email){
        return data[i];
      }
    }
    return new Data();
  }
  checkVaccinated(email:string|null):boolean{
    if(this.vaccinated.length==0)
      return false;
    for(let i=0;i<this.vaccinated.length;i++){
      if(this.vaccinated[i].email==email){
        return true;
      }
    }
    return false;
  }
  addVaccinated(ip: Data){
    this.curr=ip;
    this.vaccinated.push(this.curr);
    const jsonData=JSON.stringify(this.vaccinated);
    localStorage.setItem('vaccinated',jsonData);
  }
  
  
}
