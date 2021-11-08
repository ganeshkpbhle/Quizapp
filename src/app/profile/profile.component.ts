import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../api.service';
import { Get_User } from '../shared/data.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  profdata:Get_User={uEmail:"",uId:-1,mobnumber:""};
  userId:number=-1;
  maxScore:number=-1;
  constructor(private route:Router,private apiservice:ApiService,private activeRoute: ActivatedRoute) {
    this.activeRoute.params.subscribe((data)=>{
      this.userId=data["id"];
      this.apiservice.getUserbyId(data["id"]).subscribe((user)=>{
        this.profdata=user;
        apiservice.getAttemptsById(this.userId).subscribe((attempts)=>{
          attempts.forEach((item)=>{
            if(item.score>this.maxScore){
              this.maxScore=item.score;
            }
          });
        });
      });
    });
   }

  ngOnInit(): void {
  }

}
