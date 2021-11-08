import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Answers, Answer_Data, Ques_Data, User_Data } from '../shared/data.model';
import { FormGroup, FormArray, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
@Component({
  selector: 'app-ques',
  templateUrl: './ques.component.html',
  styleUrls: ['./ques.component.css']
})
export class QuesComponent implements OnInit {
  @Input() ques_data: Array<Ques_Data> = [];
  @Output() trigger: EventEmitter<Answer_Data> = new EventEmitter();
  fillData: Ques_Data | undefined;
  answers: Array<Answers> = [];
  index: number = 0;
  form: FormGroup;
  x:any;
  rootUrl: string = "assets/img/";
  btnText: string = "Save & Next";
  counter: string = "";
  target_Time: Date = new Date();
  constructor(private route: Router) {
    this.form = new FormGroup({
      Option: new FormControl()
    });
  }

  ngOnInit(): void {
    this.ques_data.forEach((item) => {
      this.answers.push({ Qn: item.qn, QnId: item.qnId, ImageName: item.imageName, selected: -1 });
    });
    this.target_Time.setMinutes(new Date().getMinutes() + 1);
    this.Timer();
  }
  previousQues() {
    this.answers[this.index].selected = parseInt(this.form.get("Option")?.value);
    if (this.index > 0) {
      this.index--;
      this.form.setValue({ "Option": this.answers[this.index].selected.toString() });
    }
  }
  nextQues() {
    this.answers[this.index].selected = parseInt(this.form.get("Option")?.value);
    if (this.index < this.ques_data.length) {
      this.index++;
      this.form.setValue({ "Option": this.answers[this.index].selected.toString() });
    }
  }
  Submit() {
    this.trigger.emit({ answered: this.answers, Time_spent: this.counter });
    clearInterval(this.x);
  }
  Timer() {
    this.x = setInterval(() => {
      let now: Date = new Date();
      let app: string = "0";
      let diff: number = this.target_Time.getTime() - now.getTime();
      let min: string = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)).toString();
      let sec: string = Math.floor((diff % (1000 * 60)) / 1000).toString();
      min = (min.length === 2) ? min : app + min;
      sec = (sec.length === 2) ? sec : app + sec;
      this.counter = min + " : " + sec;
      if (diff <= 0) {
        clearInterval(this.x);
        setTimeout(() => {
          this.trigger.emit({ answered: this.answers, Time_spent: this.counter });
          this.counter = "Time Out Submitting Your Answers";
        }, 3000)
      }
    }, 1100);
  }
}
