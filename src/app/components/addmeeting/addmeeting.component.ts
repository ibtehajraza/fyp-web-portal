import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { AppRouter } from './../../app.routing';
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase, AngularFireObject, AngularFireList } from 'angularfire2/database';
import { Schedule } from '../.././class/Schedule';
import { Scheduler } from 'rxjs/Scheduler';
import { AngularFireAction } from 'angularfire2/database/interfaces';

// import {MatDialog, MatDialogConfig} from '@angular/material';

 @Component({
  selector: 'app-addmeeting',
  templateUrl: './addmeeting.component.html',
  styleUrls: ['./addmeeting.component.css']
})
export class AddmeetingComponent implements OnInit {

  // items: Observable<any[]>;
  // test = '';
  // trileItem: Observable<any[]>;
  // itemRef: AngularFireObject<any>;
  // itemRefL: AngularFireList<any>;

  // schedule: AngularFireObject<Schedule>;
  // allSchedule: AngularFireObject<Schedule[]>;
  path = 'Schedule//dVJADHQ2rDflxtuNjAmY1hh7wGy2';

  closeImage: any = '../../../../src/assets/image/close.png';

  drname: string;
  drarea: string;
  drspec: string;
  drtom: string;
  drday: string;
  contactInfo: string;
  schedulingDay: string;

  options = ['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY'];
  optionSelected: any;

  /** Setting color fields */

  color = ['#1048a3', '#74a20f', '#a10e0e'];
  count;

  dbRef : AngularFireList<any>;
  monRef: AngularFireList<any>;
  monday: Observable<any[]>;

  tueRef: AngularFireList<any>;
  tuesday: Observable<any[]>;

  wedRef: AngularFireList<any>;
  wednesday: Observable<any[]>;

  thuRef: AngularFireList<any>;
  thursday: Observable<any[]>;

  friRef: AngularFireList<any>;
  friday: Observable<any[]>;

  satRef: AngularFireList<any>;
  saturday: Observable<any[]>;


  constructor(private db: AngularFireDatabase) {  }

  ngOnInit() {

    this.count = 0;

    this.dbRef = this.db.list(this.path);

    this.monRef = this.db.list(this.path, ref => ref.orderByChild('day').equalTo('monday'));

    this.monday = this.monRef.snapshotChanges().map(changes => {
      return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    });
    // tuesday
    this.tueRef = this.db.list(this.path, ref => ref.orderByChild('day').equalTo('tuesday'));

    this.tuesday = this.tueRef.snapshotChanges().map(changes => {
      return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    });
    // wed
    this.wedRef = this.db.list(this.path, ref => ref.orderByChild('day').equalTo('wednesday'));

    this.wednesday = this.wedRef.snapshotChanges().map(changes => {
      return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    });

    // thu
    this.thuRef = this.db.list(this.path, ref => ref.orderByChild('day').equalTo('thursday'));

    this.thursday = this.thuRef.snapshotChanges().map(changes => {
      return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    });

    //fri

    this.friday = this.db.list(this.path, ref => ref.orderByChild('day').equalTo('friday'))
      .snapshotChanges().map(changes => {
        return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
      });

    //sat

    this.saturday = this.db.list(this.path, ref => ref.orderByChild('day').equalTo('saturday'))
      .snapshotChanges().map(changes => {
        return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
      });

  }



  getColor() {
    if (this.count < 0 || this.count > 2) {
      this.count = 1
    }

    const styles = {
      // CSS property names
      'background-color': this.color[this.count]       // italic
      // 'font-weight': this.anotherProperty ? 'bold'   : 'normal',  // normal
    };
    this.count++;
    return styles;
  }


  onOptionsSelected(event) {
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
      docSpecialization: this.drspec,
      tom: this.drtom,
      gps: '24.336, 16.444',
    };
    const itemRef = this.db.list(this.path);
    itemRef.push(newSchedule);
  }


  onDelete(key: string) {
    this.dbRef.remove(key);
  }


  // openDialog(): void {
  
  // }


}

