import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Get_User, Ques_Data, Recv_Attempt_Data, User_Data } from './shared/data.model';
import { environment } from "../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ApiService {
   header:HttpHeaders|undefined;
     token:string="";
  constructor(private http: HttpClient) { }
  AddUser = (data: User_Data) => {
    return this.http.post(environment.baseUrl + "userdata", data);
  };
  getUserbyId = (Id:number) => {
    this.token = JSON.parse(localStorage["user"])["token"];
      this.header=new HttpHeaders({
        'Content-Type':'application/json',
        'Authorization':`Bearer ${this.token}`
    });
    return this.http.get<Get_User>(environment.baseUrl + `userdata/${Id}`,{ headers:this.header });
  };
  getQuestions = () => {
    return this.http.get<Array<Ques_Data>>(environment.baseUrl + "QuesDb");
  }
  UpdateUser = (data: User_Data, Id: number) => {
    this.token = JSON.parse(localStorage["user"])["token"];
      this.header=new HttpHeaders({
        'Content-Type':'application/json',
        'Authorization':`Bearer ${this.token}`
    });
    return this.http.put(environment.baseUrl + `userdata/${Id}`, data,{ headers:this.header });
  }
  getAttemptsById = (Id: number) => {
    
    this.token = JSON.parse(localStorage["user"])["token"];
      this.header=new HttpHeaders({
        'Content-Type':'application/json',
        'Authorization':`Bearer ${this.token}`
    });
    //console.log(this.token);
    return this.http.get<Array<Recv_Attempt_Data>>(environment.baseUrl + `attempt/${Id}`, { headers:this.header });
  }
  PostAttempt = (data: any) => {
    var header;
    var token;
    token = JSON.parse(localStorage["user"])["token"];
      header=new HttpHeaders({
        'Content-Type':'application/json',
        'Authorization':`Bearer ${token}`
    });
    return this.http.post(environment.baseUrl + "attempt", data,{headers:header});

  }
  loginUser = (User: User_Data) => {
    return this.http.post(environment.baseUrl + "userdata/Login", User);
  }
}
