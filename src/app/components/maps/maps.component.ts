import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { DataService } from '../../data.service';

import { AngularFireDatabase, AngularFireObject, AngularFireList } from 'angularfire2/database';

// declare const google: any;
@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.css']
})
export class MapsComponent implements OnInit {


  title = 'Salesman Pin Locations';
  lat = 24.95243;
  lng = 67.07693;
  zoom = 8;


  items: Observable<any[]>;
  userId: string;
  path: string;
  meetings: Meeting[];
  markers: Marker[];
  valid = true;
  userKey: string;

  constructor(private db: AngularFireDatabase, private data: DataService) {
    // console.log('From Constructor');
  }

  ngOnInit() {
    // this.data.currentMessage.subscribe(message => this.userKey = message);
    console.log('From OnInit');
    this.userId = this.data.getUserIdForLocation();
    console.log('dsd  ' + this.userId);
    // console.log(this.userId);
    // this.userId = 'dVJADHQ2rDflxtuNjAmY1hh7wGy2';

    if ( this.userId !== null ) {
      this.path = 'SalesMan//' + this.userId + '//meeting';
      // this.items = this.db.list('SalesMan//' + this.userId + 'meeting')
      // .valueChanges();
    console.log('dsd  ' + this.path);
      this.valid = true;
      this.meetings = new Array();
      this.markers = new Array();
      this.getMeetingFromDb();
    }

  }

  getMeetingFromDb() {
    this.db.object(this.path).snapshotChanges()
      .subscribe(
        data => {
          data.payload.forEach(
            meetingValue => {
              // this.testSchedule.push(scheduleValue.val());
              this.meetings.push(meetingValue.val());
              // console.log( meetingValue.val());
              return false;
            }
          );
          // console.log(this.meetings.length.toString());
          this.mapMeeting();

        }
      );


  }

  mapMeeting() {
    this.meetings.forEach(
      meeting => {
        // console.log('ClientName= ' + meeting.clientName);
        const met = meeting.gps.split(',');
        const lat = +met[0];
        const long = +met[1].replace(/\s+/g, '');
        // console.log(lat);
        // console.log('TimeStamp= ' + meeting.timeStamp);
        const mark = {
          lat: lat,
          lng: long,
          label: 'M',
          infoText: 'ClientName: ' + meeting.clientName + '\n'
                  + 'TimeOfMeeting: ' + meeting.timeStamp,
          draggable: false
        };

        this.markers.push(mark);
      }
    );
  }

  clickedMarker(label: string, index: number) {
    console.log(`clicked the marker: ${label || index}`);
    // this.infoWindowText=`clicked the marker: ${label || index}`;
  }

  // mapClicked($event: MouseEvent) {
  //   this.markers.push({
  //     lat: $event.coords.lat,
  //     lng: $event.coords.lng,
  //     draggable: true
  //   });
  // }

  markerDragEnd(m: Marker, $event: MouseEvent) {
    console.log('dragEnd', m, $event);
  }

}

// just an interface for type safety.
interface Marker {
  lat: number;
  lng: number;
  label?: string;
  infoText?: string;
  draggable: boolean;
}

interface Meeting {
  gps: string;
  clientName: string;
  timeStamp: string;
}



