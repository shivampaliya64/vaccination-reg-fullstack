import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  img1:string="vaccination-reg\src\media\coronavirus-2.jpg";
  
  constructor() { }

  ngOnInit(): void {
  }

}
