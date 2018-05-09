import { Mapping } from './addschedule.component';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase, AngularFireObject, AngularFireList } from 'angularfire2/database';

@Component({
  selector: 'app-add-schedule',
  templateUrl: './addschedule.component.html',
  styleUrls: ['./addschedule.component.css']
})


export class AddscheduleComponent implements OnInit {


  doc: any[];
  docSelected: any[];
  rnk: any[];

  doctors: Array<Mapping> = [];
  salesRap: Array<Mapping> = [];
  // salesRap: Mapping[];


  salesManArray: SalesMan[];
  doctorArray: Doctor[];

  salesmanRef: AngularFireList<any>;
  salesMan: Observable<any[]>;

  doctorRef: AngularFireList<any>;
  doctor: Observable<any[]>;

  medicines: Observable<any[]>;
  meds: any[];

  color = ['#FFF392', '#80E8AF', '#9498FF', '#E87F8B'];
  count;


  constructor(public db: AngularFireDatabase) {
    this.salesmanRef = db.list('SalesMan');
    this.salesMan = this.salesmanRef.snapshotChanges().map(changes => {
      return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    });


    this.medicines = db.list('Medicines').snapshotChanges().map(changes => {
      return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    });


    this.medicines.forEach(
      (med) => {
        med.forEach(
          (nj) => {
            // console.log(nj.key);
            this.meds.push(nj);
            // console.log(med)
          }
        )
      }
    );


    // this.salesMan.forEach(
    //   (data) => {
    //     data.forEach(
    //       (sale) => {
    //         // console.log(sale);
    //         this.salesManArray.push(sale);
    //       }
    //     );
    //   });



    this.doctorRef = db.list('Doctor');
    this.doctor = this.doctorRef.snapshotChanges().map(changes => {
      return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    });



    this.doctor.forEach(
      (data) => {

        for (let i = 0; i < data.length; i++) {
          var splitted = data[i].gps.split(",");

          var mm = [
            this.meds[Math.floor(Math.random() * 10) + 1].medicineName,
            this.meds[Math.floor(Math.random() * 10) + 1].medicineName,
            this.meds[Math.floor(Math.random() * 10) + 1].medicineName,
            this.meds[Math.floor(Math.random() * 10) + 1].medicineName,
            this.meds[Math.floor(Math.random() * 10) + 1].medicineName
          ];

          let m: Mapping = {
            Id: data[i].key,
            name: data[i].name,
            rating: data[i].score,
            lat: splitted[0],
            lng: splitted[1],
            medicine: mm
          };


          // console.log(m.medicine.toString());
          this.doctors.push(m);
          // console.log( 'DOCTORS: ' + this.doctors.length)

        }

      });



    // this.salesMan.forEach(
    // (data) => {

    //   for (let i = 0; i < data.length; i++) {
    //     var splitted = data[i].gps.split(",");

    //     var mm = [
    //       this.meds[Math.floor(Math.random() * 10) + 1].medicineName,
    //       this.meds[Math.floor(Math.random() * 10) + 1].medicineName,
    //       this.meds[Math.floor(Math.random() * 10) + 1].medicineName,
    //       this.meds[Math.floor(Math.random() * 10) + 1].medicineName,
    //       this.meds[Math.floor(Math.random() * 10) + 1].medicineName
    //     ];

    //     let m: Mapping = {
    //       Id: data[i].key,
    //       name: data[i].name,
    //       rating: data[i].score,
    //       lat: splitted[0],
    //       lng: splitted[1],
    //       medicine: mm
    //     };


    //     // console.log(m.medicine.toString());
    //     this.salesRap.push(m);
    //     // console.log( 'DOCTORS: ' + this.doctors.length)
    //     console.log(this.salesRap.length)
    //   }

    // });








  }

  ngOnInit() {
    this.count = 0;
    this.salesManArray = new Array();
    this.doctorArray = new Array();
    this.doc = new Array();
    this.docSelected = new Array();
    this.rnk = new Array();
    this.meds = new Array();
    // this.salesRap = new Array();
    // this.doctors = [] Mapping[];

  }




  getColor() {
    if (this.count < 0 || this.count > 3) {
      this.count = 0
    }

    const styles = {
      // CSS property names
      'background-color': this.color[this.count]       // italic
      // 'font-weight': this.anotherProperty ? 'bold'   : 'normal',  // normal
    };
    this.count++;
    return styles;
  }


  performMapping(distance: any, ranking: any , med:any) {
    const Wd = 0.5;
    const Wm = 0.25;
    const Wr = 0.25;


    return (Wd * distance) + (Wr * ranking) + (Wm* med);
  }




  distanceNormalization(distance) {
    let value = 0;
    distance = distance / 1000;
    // console.log('Distance=> ' + distance);
    if (distance < 10)
      value = 1 - distance;

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
    let d = R * c; // Distance in m
    return d;
  }

  deg2rad(deg) {
    return deg * (Math.PI / 180)
  }


  getConnections(key: string) {



    // this.salesManArray.forEach(
    //   (salesMan)=>{
    //     if(salesMan.key == key){

    //     }

    //   }
    // );
    console.log(key);

    this.rnk = new Array();
    let docSelected = new Array();
    let dc: string[] = new Array();
    

    this.salesMan.forEach(
      (data) => {
        data.forEach(
          (salesMan) => {
            if (salesMan.key == key) {
              var splitted = salesMan.gps.split(", ");
              var sm = [
                this.meds[Math.floor(Math.random() * 10) + 1].medicineName,
                this.meds[Math.floor(Math.random() * 10) + 1].medicineName,
                this.meds[Math.floor(Math.random() * 10) + 1].medicineName,
                this.meds[Math.floor(Math.random() * 10) + 1].medicineName,
                this.meds[Math.floor(Math.random() * 10) + 1].medicineName
              ];


              // console.log(this.doctors[0].name)

              this.doctors.forEach(
                (doc) => {

                  if( doc.name !== 'temp'){

                  var temp = this.getDistanceFromLatLonInKm(parseFloat(splitted[0]), parseFloat(splitted[1]), doc.lat, doc.lng );
                  // console.log(temp);
                  var temp2 = this.distanceNormalization(temp);
                  // console.log(temp2);

                  var rankTemp = this.rankingNormalization(parseInt(salesMan.score) / 10, doc.rating);
                  // console.log('Rank=> ' + rankTemp);


                  var medR = this.medicineNormalization(sm, doc.medicine)
                  // console.log('Med R=> ' + medR);                  

                  var t = this.performMapping(temp2, rankTemp , medR)
                  // console.log('Mapping=> ' + doc.name);
                  docSelected.push(doc.name);
                  dc.push(doc.name)
                
                  this.rnk.push(t);
                  

                }else{
                  console.log('afadffa  '+doc.name);
                }
              }

              )

            }
          }
        )

        
        this.bubbleSort(this.rnk, this.doc)
    
        const itemRef = this.db.list("SalesMan/"+key+'/doctor/');
              
        console.log(dc[dc.length-1]);

        let doctrs ={ 
          'd1' :dc[dc.length-1],
          'd2' :dc[dc.length-2],
          'd3' :dc[dc.length-3],
          'd4' : dc[dc.length-4]
    
      };


      this.doctor.forEach(
        (data) => {
          
          data.forEach(
            (dd)=>{
              if(dd.name === dc[dc.length-1] || dd.name === dc[dc.length-2] || dd.name === dc[dc.length-3] || dd.name === dc[dc.length-4]){
                dd.name = 'temp';
                console.log(dd.name);
              }
            }
          )
  
        });

        
        // itemRef.push(doctrs);
        
      }
    );






    // this.doc = new Array();
    // this.docSelected = new Array();
    // this.rnk = new Array();

    // console.log(key + " OnClick");

    // let mSaleMan: Mapping;

    // this.salesManArray.forEach(
    //   (saleMan) => {
    //     if (saleMan.key === key) {
    //       // console.log(saleMan.name);
    //       var splitted = saleMan.gps.split(", ");
    //       this.doctorArray.forEach(
    //         (doctors) => {
    //           // console.log(saleMan.name);
    //           // console.log(doctors.name);
    //           var splittedDoc = doctors.gps.split(",");

    //           // console.log(parseFloat(splitted[0]));
    //           var temp = this.getDistanceFromLatLonInKm(24.22565, parseFloat(splitted[1]), parseFloat(splittedDoc[0]), parseFloat(splittedDoc[1]));
    //           // console.log(temp);
    //           var temp2 = this.distanceNormalization(temp);
    //           // console.log(temp2);

    //           var rankTemp = this.rankingNormalization(parseInt(saleMan.score) / 10, doctors.score);
    //           // console.log('Rank=> ' + rankTemp);

    //           var t = this.performMapping(temp2, rankTemp)
    //           // console.log('Mapping=> ' + t);

    //           this.doc.push(doctors.name);
    //           this.rnk.push(t);

    //         }
    //       );

    //     }
    //   }
    // );

    // console.log(this.doc.length + ' => ' + this.rnk.length);
    // this.bubbleSort(this.rnk, this.doc)

    // this.doc.forEach(
    //   (rank)=>{
    //   console.log(  rank + '\n' );

    //   }
    // );

    // console.log('adfasdasd   ' + this.rnk.toString() + '\n' + '</br>');

    // for (let i = 0; i < 6; i++) {
    //   this.docSelected.push(this.doc[i]);
    //   console.log('DOC: ' + this.doc[i] + ' w: ' + this.rnk[i]);
    // }





  }

  bubbleSort(items, doc) {
    var length = items.length;
    for (var i = 0; i < length; i++) { //Number of passes
      for (var j = 0; j < (length - i - 1); j++) { //Notice that j < (length - i)
        //Compare the adjacent positions
        if (items[j] > items[j + 1]) {
          //Swap the numbers
          var tmp = items[j];  //Temporary variable to hold the current number
          var d = doc[j]
          items[j] = items[j + 1]; //Replace current number with adjacent number
          doc[j] = doc[j + 1]
          items[j + 1] = tmp; //Replace adjacent number with current number
          doc[j + 1] = d
        }
      }
    }
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
  gps?: string;
}

export interface Doctor {

  key?: string;
  name?: string;
  contact?: string;
  score?: string;
  specialization?: string;
  gps?: string;

}


