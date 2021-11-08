import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import jwt_decode from 'jwt-decode';
import { ApiService } from '../api.service';
import { FirebaseService } from '../firebase.service';
import { Answer_Data, Attempt_Data, Ques_Data, Recv_Attempt_Data } from '../shared/data.model';
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  userId: number = -1;
  userMail: string = "";
  x:any;
  attemptsProf: Array<Recv_Attempt_Data> = [];
  questions: Array<Ques_Data> = [];
  Isnot: boolean = true;
  constructor(private activeRoute: ActivatedRoute, private service: FirebaseService,
    private route: Router, private apiserve: ApiService) {
  }
  ngOnInit(): void {
    this.SessionExpiry();
    this.activeRoute.params.subscribe((data) => {
      if (localStorage.getItem("user") !== null) {
        let tok = "";
        tok = localStorage["user"];
        this.userMail=JSON.parse(window.atob(tok.split('.')[1]))["sub"];
        this.userId=data["id"];
      }
      this.GetAttempts();
      this.apiserve.getQuestions().subscribe((quest) => {
        this.questions = quest;
      });
    });
  }
  logout() {
    console.log("loggedOut");
    this.route.navigate(["/register"])
      .then(() => {
        this.route.navigate(["/login"]);
      });
      clearInterval(this.x);
  }
  startQuiz() {
    this.Isnot = !this.Isnot;
  }
  testFinish(data: Answer_Data) {
    let Score: number = 0;
    console.log(data);
    this.questions.forEach((item, index) => {
      if (item.ans === data.answered[index].selected) {
        Score += 1;
      }
    });
    if(parseInt(data.Time_spent.slice(0,2))<0){
      data.Time_spent="00 : 00";
    }
    let temp: Attempt_Data = { Date: new Date().toISOString().slice(0, 19), UId: this.userId, Score: Score, TimeSpent: 60 - ((parseInt(data.Time_spent.slice(0, 2)) * 60) + parseInt(data.Time_spent.slice(5, 8))) }
    this.apiserve.PostAttempt(temp)
      .subscribe(() => {
        this.GetAttempts();
        this.Isnot = !this.Isnot;
      }
      ,(err)=>{
          console.log(err);
      });
  }
  GetAttempts() {
    this.apiserve.getAttemptsById(this.userId).subscribe((result) => {
      this.attemptsProf = result;
    });
  }
  getDate(date: string) {
    return new Date(date).toUTCString().slice(0, 26);
  }
  getTime(seconds: number) {
    let timestr: string = "";
  }
  SessionExpiry(){
    let token:string=JSON.parse(localStorage["user"])["token"];
    let obj:any=jwt_decode(token);
    let tg_exp:Date=new Date(obj["exp"]*1000);
    //console.log(tg_exp);
    this.x= setInterval(()=>{
      //console.log(tg_exp.getTime()-new Date().getTime());
      if(tg_exp.getTime()-new Date().getTime()<1){
        alert("Session Expired Login Again");
        clearInterval(this.x);
        localStorage.removeItem("user");
        this.route.navigate(["/login"]);
      }
    },1000*60)
    }
}


