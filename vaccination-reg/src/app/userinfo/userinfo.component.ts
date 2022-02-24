import { Component, OnInit } from '@angular/core';
import { DatastoreService } from '../service/datastore.service';
import { ActivatedRoute } from '@angular/router';
import { Data } from '../models/data';
import { Vaccine } from '../models/vaccine';
import { Router } from '@angular/router';

@Component({
  selector: 'app-userinfo',
  templateUrl: './userinfo.component.html',
  styleUrls: ['./userinfo.component.css']
})
export class UserinfoComponent implements OnInit {

  constructor(private dataStore:DatastoreService,private activatedroute:ActivatedRoute, private router: Router) { }
  ngOnInit(): void {
  }
  people:Data = this.dataStore.matchData(this.activatedroute.snapshot.paramMap.get('id'));
  d:Vaccine[]= [
    {id: 1, name: "Covid Shield"},
    {id: 2, name: "Covaccine"},
    {id: 3, name: "Sputnik V"}
  ];
  vaccine:Vaccine=new Vaccine();
  selected(){
    alert(this.vaccine.name+" is selected");    
  }
  isVaccinated:boolean=true;
  confirm(){
    this.isVaccinated=this.dataStore.checkVaccinated(this.people.email);
    if(this.isVaccinated){
      alert("Already Vaccinated");
    }
    else{
      this.dataStore.addVaccinated(this.people);
      this.router.navigate(['/vaccines',this.vaccine.id]);
    }
    
  }
  
}
