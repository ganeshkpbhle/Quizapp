import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  IsSignedIn: boolean = false;
  exstAcc: string = "";
  fcred:boolean=false;
  constructor(private route: Router,private service:ApiService) {
    this.form = new FormGroup({
      Email: new FormControl("", Validators.email),
      Passwd: new FormControl("", Validators.required)
    });
  }
  ngOnInit(): void {
    let val: string = "";
    if (localStorage.getItem("user") !== null) {
      let val1: string = localStorage["user"];
      val = val1.slice(val1.indexOf("email"), val1.indexOf("emailVerified"));
      val = val.slice(8, val.length - 3);
      this.IsSignedIn = true;
      this.exstAcc = val;
    }
    else {
      this.IsSignedIn = false;
    }
    //console.log(new Date().toISOString().slice(0, 19).replace('T', ' '));
  }
  async submit() {
    this.service.loginUser({UEmail:this.form.controls["Email"].value,Passwd:this.form.controls["Passwd"].value})
    .subscribe((token)=>{
      localStorage.setItem("user",JSON.stringify(token));
      let tok="";
      tok=localStorage["user"];
      //console.log(JSON.parse(window.atob(tok.split('.')[1])));
      this.route.navigate(["/user",JSON.parse(window.atob(tok.split('.')[1]))["unique_name"]]);
    },
    (err)=>{
      this.fcred=true;
      this.form.setValue({Email:"",Passwd:""});
      setTimeout(()=>{
        this.fcred=false;
      },5000);
    });
  }
}
