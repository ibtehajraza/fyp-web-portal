import { BrowserModule } from '@angular/platform-browser';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';

import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import 'hammerjs';
// Import for material components
import { MatCardModule, MatFormFieldModule, 
  MatButtonModule, MatInputModule, MatChipsModule,
  MatSelectModule,MatGridListModule, MatToolbarModule,
  MatListModule, MatExpansionModule, MatDialogModule, MatIconModule } from '@angular/material';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
// firebase configuration
import { AngularFireModule } from 'angularfire2';
import { environment } from '../environments/environment';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { DoctorComponent } from './components/doctor/doctor.component';
import { AppRouter } from './app.routing';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { Router } from '@angular/router';
import { AddscheduleComponent } from './components/addschedule/addschedule.component';
import { AddmeetingComponent } from './components/addmeeting/addmeeting.component';
import { MapsComponent } from './components/maps/maps.component';
import { AgmCoreModule } from '@agm/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// import { AdddoctorComponent } from './components/adddoctor/adddoctor.component';
import { DataService } from '../app/data.service';



@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    DoctorComponent,
    LoginComponent,
    SignupComponent,
    AddscheduleComponent,
    AddmeetingComponent,
    MapsComponent
   // AdddoctorComponent,


  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase, 'pharma3'),
    AngularFireDatabaseModule,
    // AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features,
    AngularFireStorageModule,
    AppRouter, HttpModule , FormsModule,
    MatCardModule, MatFormFieldModule, MatButtonModule,
    MatInputModule,
    MatSelectModule,
    MatFormFieldModule,
    MatButtonModule, MatToolbarModule,
    MatExpansionModule,
    BrowserAnimationsModule, MatDialogModule,
    MatListModule,
    MatIconModule, MatChipsModule
    MatGridListModule,
    AgmCoreModule.forRoot({
      apiKey: environment.googleMapsKey
    })


  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
