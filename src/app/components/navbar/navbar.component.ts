import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { DataService } from '../../data.service';
import { AppRouter } from './../../app.routing';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})


export class NavbarComponent implements OnInit {


  // panelOpenState: boolean = false;
  salesmanRef: AngularFireList<any>;
  salesMan: Observable<any[]>;
  userKey: string;

  constructor(db: AngularFireDatabase,  private router: Router, private data: DataService) {
    this.salesmanRef = db.list('SalesMan');
    // Use snapshotChanges().map() to store the key
    this.salesMan = this.salesmanRef.snapshotChanges().map(changes => {
      return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    });
  }

  ngOnInit() {
  }

  onDelete(key: string) {
    this.salesmanRef.remove(key);
    // this.salesMan.remove
    // this.salesMan.$key
  }

  onlocationClick(key: string) {
    this.data.setUserIdForLocation(key);
    this.router.navigate(['maps']);
  }
}
