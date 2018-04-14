

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NavbarComponent } from './components/navbar/navbar.component';
import { DoctorComponent } from './components/doctor/doctor.component';
import {LoginComponent } from './components/login/login.component';
import {SignupComponent } from './components/signup/signup.component';
import {AddscheduleComponent} from './components/addschedule/addschedule.component';
import {AddmeetingComponent} from './components/addmeeting/addmeeting.component';
import { MapsComponent } from './components/maps/maps.component';
//import { AdddoctorComponent} from './components/adddoctor/adddoctor.component'


const routes : Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full'  },
    { path:'home', component:NavbarComponent},
    { path:'doctor', component:DoctorComponent },
    { path:'login', component:LoginComponent},
    { path:'signup', component:SignupComponent},
    { path:'addschedule' , component:AddscheduleComponent},
    { path:'addmeeting', component:AddmeetingComponent},
    { path:'maps', component: MapsComponent}
   // { path: '**', component: PageNotFoundComponent }
 
]

export const AppRouter = RouterModule.forRoot(routes) ;
// export class AppRouter{ }