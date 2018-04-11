import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  

  salesmanRef: AngularFireList<any>;
  salesMan: Observable<any[]>;

  constructor(db: AngularFireDatabase) {
    this.salesmanRef = db.list('SalesMan');
    // Use snapshotChanges().map() to store the key
    this.salesMan = this.salesmanRef.snapshotChanges().map(changes => {
      return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    });
  }

  onDelete(key: string)
  {
    this.salesmanRef.remove(key);
    // this.salesMan.remove
    // this.salesMan.$key
  }

  ngOnInit() {
  }

}
