import { Component, OnInit, Output ,EventEmitter, Input} from '@angular/core';
import { FirebaseService } from '../firebase.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.css']
})
export class TopbarComponent implements OnInit {
  @Output() logOut=new EventEmitter();
  @Input() Id:number|undefined;
  @Input() mail:string|undefined;
  constructor(private service:FirebaseService,private route:Router) { }

  ngOnInit(): void {
  }
  
  logout() {
    if (localStorage.getItem("user")!==null) {
        this.service.IsLoggedIn = false;
        localStorage.removeItem("user");
        this.logOut.emit();
    }
  }
}
