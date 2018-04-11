import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';


@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styleUrls: ['./doctor.component.css']
})
export class DoctorComponent implements OnInit {



  doctorRef: AngularFireList<any>;
  Doctor: Observable<any[]>;
  constructor(db: AngularFireDatabase) {

    this.doctorRef = db.list('Doctor');
    // Use snapshotChanges().map() to store the key
    this.Doctor = this.doctorRef.snapshotChanges().map(changes => {
      return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    });

  }

  onDelete(key: string) {
    this.doctorRef.remove(key);
    // this.salesMan.remove
    // this.salesMan.$key
  }

  // onEdit(key : string, newText : string)
  // {
  //     this.doctorRef.update(key,{text :newText});

  // }

  ngOnInit() {
  }

}
