import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseService } from '../firebase.service';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  reg: boolean = true;
  constructor(private service: FirebaseService, private route: Router) {
    this.route.events.subscribe(() => {
      if (this.route.url==="/login") {
        this.reg =false;
      }
      if(this.route.url==="/register"){
        this.reg =true;
      }
    });
  }

  ngOnInit(): void {
    this.route.navigate(["/register"]);
  }
}
