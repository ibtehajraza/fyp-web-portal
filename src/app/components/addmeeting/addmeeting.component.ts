import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppRouter } from './../../app.routing';
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase, AngularFireObject, AngularFireList } from 'angularfire2/database';
import { Schedule } from '../.././class/Schedule';
import { Scheduler } from 'rxjs/Scheduler';

// import { AngularFireAuth , AngularFireAuthModule } from 'angularfire2/auth';
// import {AngularFireModule} from 'angularfire2';
// // import { Observable } from 'rxjs/Observable';
// import * as firebase from 'firebase/app';


@Component({
  selector: 'app-addmeeting',
  templateUrl: './addmeeting.component.html',
  styleUrls: ['./addmeeting.component.css']
})
export class AddmeetingComponent implements OnInit {

  items: Observable<any[]>;
  test = '';
  trileItem: Observable<any[]>;
  itemRef: AngularFireObject<any>;
  itemRefL: AngularFireList<any>;

  schedule: AngularFireObject<Schedule>;
  allSchedule: AngularFireObject<Schedule[]>;
  path = 'Schedule//dVJADHQ2rDflxtuNjAmY1hh7wGy2';

  drname: string;
  drarea: string;
  drspec: string;
  drtom: string;
  drday: string;
  contactInfo: string;
  schedulingDay: string;
  
  testSchedule: Schedule[];
  monSchedule: Schedule[];
  tueSchedule: Schedule[];
  wedSchedule: Schedule[];
  thuSchedule: Schedule[];
  friSchedule: Schedule[];
  satSchedule: Schedule[];
  sch: Schedule;
  // days: any;
  // days = [
  //   {value: 'monday-0', viewValue: 'Monday'},
  //   {value: 'tuesday-1', viewValue: 'Tuesday'},
  //   {value: 'wednesday-2', viewValue: 'Wednesday'},
  //   {value: 'thursday-3', viewValue: 'Thursday'},
  //   {value: 'friday-4', viewValue: 'Friday'},
  //   {value: 'saturday-5', viewValue: 'Saturday'}
  // ];

  // foods = [
  //   {value: 'steak-0', viewValue: 'Steak'},
  //   {value: 'pizza-1', viewValue: 'Pizza'},
  //   {value: 'tacos-2', viewValue: 'Tacos'}
  // ];
/*
  options = [
      {value: 'monday-0', viewValue: 'Monday'},
      {value: 'tuesday-1', viewValue: 'Tuesday'},
      {value: 'wednesday-2', viewValue: 'Wednesday'},
      {value: 'thursday-3', viewValue: 'Thursday'},
      {value: 'friday-4', viewValue: 'Friday'},
      {value: 'saturday-5', viewValue: 'Saturday'}
  ];*/

  options = ['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY'];
  optionSelected: any;

  constructor(public db: AngularFireDatabase) { }

  ngOnInit() {
    this.items = this.db.list('Schedule//dVJADHQ2rDflxtuNjAmY1hh7wGy2').valueChanges();
    // this.tempDocArr = new Array();
    this.testSchedule = new Array();
    this.monSchedule = new Array();
    this.tueSchedule = new Array();
    this.wedSchedule = new Array();
    this.thuSchedule = new Array();
    this.friSchedule = new Array();
    this.satSchedule = new Array();
    // this.drname = "Dr. Bilal"/;
    // this.days = [
    //   {value: 'monday', viewValue: 'Monday'},
    //   {value: 'tuesday', viewValue: 'Tuesday'},
    //   {value: 'wednesday', viewValue: 'Wednesday'},
    //   {value: 'thursday', viewValue: 'Thursday'},
    //   {value: 'friday', viewValue: 'Friday'},
    //   {value: 'saturday', viewValue: 'Saturday'}
    // ];
    this.getSchedule();
  }

  getSchedule() {
    this.db.object(this.path).snapshotChanges()
      .subscribe(
        data => {
          data.payload.forEach(
            scheduleValue => {
              this.testSchedule.push(scheduleValue.val());
              console.log(scheduleValue.val());
              return false;
            }
          );
          console.log( '-- LENGTH==>' + this.testSchedule.length);
          this.divideAndConquir();
        }
      );

  }

  divideAndConquir() {
    this.testSchedule.forEach(
      schedule => {
        if (schedule.day === 'monday') {
          this.monSchedule.push(schedule);
        }
        if (schedule.day === 'tuesday') {
          this.tueSchedule.push(schedule);
        }
        if (schedule.day === 'wednesday') {
          this.wedSchedule.push(schedule);
        }
        if (schedule.day === 'thursday') {
          this.thuSchedule.push(schedule);
        }
        if (schedule.day === 'friday') {
          this.friSchedule.push(schedule);
        }
        if (schedule.day === 'saturday') {
          this.satSchedule.push(schedule);
        }

    });
  }

  getColor() {

    const styles = {
      // CSS property names
      'background-color':  '#' + (0x1000000 + (Math.random()) * 0xffffff).toString(16).substr(1, 6),     // italic
      // 'font-weight': this.anotherProperty ? 'bold'   : 'normal',  // normal
  };

  return styles;
  }


  onOptionsSelected(event){
    console.log(Math.random().toString(36).replace(/[^a-z]+/g, '').substr(1, 15)); //option value will be sent as event
    this.schedulingDay = event.toString().toLowerCase();
    console.log(this.schedulingDay); //option value will be sent as event
    
   }

  addSchedule() {
    const tempString = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(1, 15);
    const newSchedule: Schedule = {
       day: this.schedulingDay,
       brick: 'zzz',
       docName: this.drname,
       docArea: this.drarea,
       docContact: this.contactInfo,
       docId: tempString,
       docSpecialization:  this.drspec,
       tom: this.drtom,
       gps: '24.336, 16.444',
      };
       const itemRef = this.db.list('Schedule//dVJADHQ2rDflxtuNjAmY1hh7wGy2');
    // itemRef.set(newSchedule);
    itemRef.push(newSchedule);
    //  console.log(this.drname);
    //  console.log(this.drarea);
    //  console.log(this.drspec);
    //  console.log(this.drtom);
    //  console.log(this.optionSelected);
  }

}
