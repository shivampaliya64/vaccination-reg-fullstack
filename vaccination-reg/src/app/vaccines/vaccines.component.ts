import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DatastoreService } from '../service/datastore.service';

@Component({
  selector: 'app-vaccines',
  templateUrl: './vaccines.component.html',
  styleUrls: ['./vaccines.component.css']
})
export class VaccinesComponent implements OnInit {

  constructor(private dataStore:DatastoreService,private activatedroute:ActivatedRoute) { }

  ngOnInit(): void {
  }
  
}
