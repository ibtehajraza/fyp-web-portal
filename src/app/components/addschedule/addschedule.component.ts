// import { Schedule } from './../../class/Schedule';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase, AngularFireObject, AngularFireList } from 'angularfire2/database';
// import { Schedule } from '../.././class/Schedule';

@Component({
  selector: 'app-add-schedule',
  templateUrl: './addschedule.component.html',
  styleUrls: ['./addschedule.component.css']
})

// export class ListSelectionExample {
//   typesOfShoes = ['Boots', 'Clogs', 'Loafers', 'Moccasins', 'Sneakers'];
// }


export class AddscheduleComponent implements OnInit {

  // items: Observable<any[]>;
  // test = '';
  // trileItem: Observable<any[]>;
  // itemRef: AngularFireObject<any>;
  // itemRefL: AngularFireList<any>;

  // schedule: AngularFireObject<Schedule>;
  // allSchedule: AngularFireObject<Schedule[]>;
  // path = 'Schedule//dVJADHQ2rDflxtuNjAmY1hh7wGy2';


  doctors: Mapping[];
  salesRap: Mapping[];
  typesOfShoes = ['Boots', 'Clogs', 'Loafers', 'Moccasins', 'Sneakers'];


  salesManArray: SalesMan[];
  doctorArray: Doctor[];


  // testSchedule: Schedule[];
  // monSchedule: Schedule[];
  // tueSchedule: Schedule[];
  // wedSchedule: Schedule[];
  // thuSchedule: Schedule[];
  // friSchedule: Schedule[];
  // satSchedule: Schedule[];
  // sch: Schedule;
  salesmanRef: AngularFireList<any>;
  salesMan: Observable<any[]>;

  doctorRef: AngularFireList<any>;
  doctor: Observable<any[]>;

  color = ['#1048a3', '#74a20f', '#a10e0e'];
  count;

  constructor(public db: AngularFireDatabase) {
    this.salesmanRef = db.list('SalesMan');
    // Use snapshotChanges().map() to store the key
    this.salesMan = this.salesmanRef.snapshotChanges().map(changes => {
      return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    });


    this.salesMan.forEach(
      (data) => {
        data.forEach(
          (sale) => {
            // console.log(sale);
            this.salesManArray.push(sale);
          }
        );
        // this.salesManArray.push(data);
        //  console.log(this.salesManArray.length.toString());       
      });



      this.doctorRef = db.list('Doctor');
      // Use snapshotChanges().map() to store the key
      this.doctor = this.doctorRef.snapshotChanges().map(changes => {
        return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
      });

      this.doctor.forEach(
        (data) => {
          data.forEach(
            (doc) => {
              console.log(doc);
              this.doctorArray.push(doc);
            }
          );

          console.log(this.doctorArray.length.toString());
        });



  }

  ngOnInit() {
    // this.items = this.db.list('Schedule//dVJADHQ2rDflxtuNjAmY/1hh7wGy2').valueChanges();
    // this.tempDocArr = new Array();
    
    this.salesManArray = new Array();
    this.doctorArray = new Array();

    this.doctors = [
      { Id: '1', name: 'Dr. Suman', lat: 24.659, lng: 64.256, rating: '10', medicine: ['panadol', 'rizic', 'arinac', 'augmentan', 'intox'] },
      { Id: '2', name: 'Dr. Chinki', lat: 26.369, lng: 61.256, rating: '9', medicine: ['calsi', 'stepsils', 'nice', 'nexium', 'acfoil'] },
      { Id: '3', name: 'Dr. Atir', lat: 25.659, lng: 60.296, rating: '2', medicine: ['flegil', 'calsend', 'arinac', 'thuja', 'arsenic'] },
      { Id: '4', name: 'Dr. Hurr', lat: 24.552, lng: 64.556, rating: '5', medicine: ['lalap', 'rizic', 'arinac', 'intamezol', 'sencos'] },
      { Id: '5', name: 'Dr. Sahir', lat: 24.005, lng: 64.666, rating: '2', medicine: ['laculap', 'laflox', 'deflon', 'zenix', 'serbex'] },
    ];

    this.salesRap = [
      { Id: '1', name: 'saim', lat: 24.645, lng: 64.256, rating: '10', medicine: ['calsi', 'laflox', 'deflon', 'augmentan', 'intox'] },
      { Id: '2', name: 'arsalan', lat: 26.269, lng: 61.256, rating: '9', medicine: ['panadol', 'stepsils', 'nice', 'nexium', 'acfoil'] },
      { Id: '3', name: 'ahsan', lat: 25.391, lng: 60.296, rating: '2', medicine: ['flegil', 'calsend', 'arinac', 'thuja', 'arsenic'] },
      { Id: '4', name: 'jai', lat: 24.002, lng: 64.556, rating: '5', medicine: ['lalap', 'rizic', 'arinac', 'intamezol', 'sencos'] },
      { Id: '5', name: 'bilal', lat: 24.550, lng: 64.666, rating: '2', medicine: ['laculap', 'rizic', 'arinac', 'zenix', 'serbex'] },
    ];

    console.log(this.getDistanceFromLatLonInKm(24.645, 64.256, 24.659, 64.256) * 1000);
    console.log(this.distanceNormalization(this.getDistanceFromLatLonInKm(24.645, 64.256, 24.659, 64.256)));

    console.log(
      this.medicineNormalization(
        ['calsi', 'laflox', 'sencos', 'augmentan', 'intox'],
        ['lalap', 'rizic', 'arinac', 'augmentan', 'sencos', 'intox']
      )
    );
    console.log(this.rankingNormalization(10, 9));

    console.log('Mapped ' + this.performMapping());
  }





  performMapping() {
    const Wd = 0.5;
    const Wm = 0.25;
    const Wr = 0.25;

    // this.doctors.forEach(
    //   doc=>{
    //     this.salesRap.forEach(
    //       sales=>{
    //        (Wd * this.distanceNormalization(this.getDistanceFromLatLonInKm(24.645, 64.256, 24.659, 64.256))) 
    //       }
    //     );
    //   }
    // );

    return (Wd * this.distanceNormalization(this.getDistanceFromLatLonInKm(24.645, 64.256, 24.659, 64.256))) +
      (Wm * this.medicineNormalization(
        ['calsi', 'laflox', 'sencos', 'augmentan', 'intox'],
        ['lalap', 'rizic', 'arinac', 'augmentan', 'sencos', 'intox']
      )) +
      (Wr * this.rankingNormalization(10, 9));
    // (Wd x D) + (Wm x M) + (Wr x R)
  }




  distanceNormalization(distance) {
    let value = 0;
    distance = distance * 1000;
    if (distance < 10000)
      value = 1 - distance / 10000;

    return value;
  }


  rankingNormalization(rankOfSaleRap, rankOfDoc) {
    return 1 - (rankOfSaleRap - rankOfDoc) / 10;
  }

  medicineNormalization(salesMedicine: string[], docMedicine: string[]) {
    let totalMatched = 0;
    let size = 0;
    if (salesMedicine.length > docMedicine.length) {
      size = docMedicine.length;
      docMedicine.forEach(
        doc => {
          salesMedicine.forEach(
            sales => {
              if (doc === sales) {
                totalMatched++;
              }
            }
          );
        }
      );


    } else {
      size = salesMedicine.length;

      salesMedicine.forEach(
        sales => {
          docMedicine.forEach(
            doc => {
              if (doc === sales) {
                totalMatched++;
              }
            }
          );
        }
      );

    }

    return totalMatched / size;
  }




  getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
    let R = 6371; // Radius of the earth in km
    let dLat = this.deg2rad(lat2 - lat1);  // deg2rad below
    let dLon = this.deg2rad(lon2 - lon1);
    let a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2)
      ;
    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    let d = R * c; // Distance in km
    return d;
  }

  deg2rad(deg) {
    return deg * (Math.PI / 180)
  }



}





export interface Mapping {
  Id: string;
  name: string;
  lat?: any;
  lng?: any;
  rating?: string;
  medicine?: string[];
}


export interface SalesMan {

  key?: string;
  name?: string;
  email?: string;
  contact?: string;
  score?: string;
}

export interface Doctor {

  key?: string;
  name?: string;
  email?: string;
  contact?: string;
  score?: string;
  specialization?: string;

}


