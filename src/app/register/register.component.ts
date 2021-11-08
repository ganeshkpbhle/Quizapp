import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup , Validators,ReactiveFormsModule} from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { User_Data } from '../shared/data.model';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  IsSignedIn:boolean=false;
  passwd:boolean=false;
  form:FormGroup;
  err:string=""
  constructor(private route:Router,private apiservice:ApiService) {
    this.form=new FormGroup(
      { 
        Email:new FormControl("",[Validators.required,Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$")]),
        Mob:new FormControl("",Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")),
        Passwd:new FormControl("",Validators.required),
        Cfpasswd:new FormControl("",Validators.required)
      }
    );
   }

  ngOnInit(): void {
    //localStorage.clear();
  }
  passCheck=()=>{
    if(this.form.controls["Passwd"].value===this.form.controls["Cfpasswd"].value){
      this.passwd=true;
    }
    else{
      this.passwd=false;
    }
  }
  async submit(){
    let temp:User_Data={UEmail:this.form.controls["Email"].value,Passwd:this.form.controls["Passwd"].value,Mobnumber:this.form.controls["Mob"].value};
    this.apiservice.AddUser(temp).subscribe((data)=>{
      //console.log("comitted:"+data);
      this.apiservice.loginUser({UEmail:this.form.controls["Email"].value,Passwd:this.form.controls["Passwd"].value})
    .subscribe((token)=>{
      localStorage.setItem("user",JSON.stringify(token));
      let tok="";
      tok=localStorage["user"];
      //console.log(JSON.parse(window.atob(tok.split('.')[1])));
      this.route.navigate(["/user",JSON.parse(window.atob(tok.split('.')[1]))["unique_name"]]);
    },
    (err)=>{
      this.form.setValue({Email:"",Passwd:""});
      setTimeout(()=>{
      },5000);
    });
    },(error: HttpErrorResponse)=>{
       this.err=error.error;
    });
  }
}
