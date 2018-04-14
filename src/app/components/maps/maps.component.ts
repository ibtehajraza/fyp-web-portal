
import { Component, OnInit } from '@angular/core';

//declare const google: any;
@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.css']
})
export class MapsComponent implements OnInit {


  title: string = 'Salesman Pin Locations';
  lat: number = 24.95243;
  lng: number = 67.07693;
  zoom: number = 8;




  constructor() {

  }

  ngOnInit() {


  }

  clickedMarker(label: string, index: number) {
    console.log(`clicked the marker: ${label || index}`)
    // this.infoWindowText=`clicked the marker: ${label || index}`;
  }

  // mapClicked($event: MouseEvent) {
  //   this.markers.push({
  //     lat: $event.coords.lat,
  //     lng: $event.coords.lng,
  //     draggable: true
  //   });
  // }

  markerDragEnd(m: marker, $event: MouseEvent) {
    console.log('dragEnd', m, $event);
  }

  markers: marker[] = [
    {
      lat: 24.95243,
      lng:  67.07693,
      label: 'Dr.AAA',
      infoText: 'NAME: Dr.Asim\nAddress:28-DC\nTimeOfMeeting:5.25',
      draggable: true
    },
    {
      lat: 24.96124,
      lng: 67.215982,
      label: 'B',
      infoText: 'NAME: Dr.Daniyal\nAddress:28-DC\nTimeOfMeeting:5.25',
      draggable: false
    },
    {
      lat: 24.95621,
      lng: 67.895982,
      label: 'C',
      infoText: 'NAME: Dr.Bilal\nAddress:28-DC\nTimeOfMeeting:5.25',
      draggable: true
    }
  ]
}

// just an interface for type safety.
interface marker {
  lat: number;
  lng: number;
  label?: string;
  infoText?: string;
  draggable: boolean;
}



