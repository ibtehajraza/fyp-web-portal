import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase, AngularFireObject, AngularFireList } from 'angularfire2/database';
import { Schedule } from '../.././class/Schedule';

@Component({
  selector: 'app-add-schedule',
  templateUrl: './addschedule.component.html',
  styleUrls: ['./addschedule.component.css']
})
export class AddscheduleComponent implements OnInit {

  items: Observable<any[]>;
  test = '';
  trileItem: Observable<any[]>;
  itemRef: AngularFireObject<any>;
  itemRefL: AngularFireList<any>;

  schedule: AngularFireObject<Schedule>;
  allSchedule: AngularFireObject<Schedule[]>;
  path = 'Schedule//dVJADHQ2rDflxtuNjAmY1hh7wGy2';



  testSchedule: Schedule[];
  monSchedule: Schedule[];
  tueSchedule: Schedule[];
  wedSchedule: Schedule[];
  thuSchedule: Schedule[];
  friSchedule: Schedule[];
  satSchedule: Schedule[];
  sch: Schedule;


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

}
