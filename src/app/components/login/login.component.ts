import { Router } from '@angular/router';
import { AppRouter } from './../../app.routing';
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth , AngularFireAuthModule } from 'angularfire2/auth';
import {AngularFireModule} from 'angularfire2';
// import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email = '';
  password= '';
  errorMessage= '';
  // auth: any;
  alert: boolean;

  // nnm = '' ;

constructor( public afAuth: AngularFireAuth , public router: Router) {
    // this.user = this.afAuth.authState;
    // this.router = routeri;
    // ..
    // this.alert = false;
    // console.log('error Login' + this.alert);
  }

  ngOnInit() {
    this.jsFile();

    this.afAuth.authState.subscribe(
      (auth) => {
        if (auth != null) {
                // this.nnm = auth.email;
                console.log('auth: ' + auth.email);
                // this.router.navigate(['/home']);
                this.router.navigate(['home'])
                
        }
      }
    );

  }



  
  logout() {
    this.afAuth.auth.signOut();
  }





  login() {
    console.log('Email: ' + this.email + '\nPassword: ' + this.password);
    if (this.email !== '' && this.password !== '' ) {
        this.afAuth.auth.signInWithEmailAndPassword(this.email, this.password)
        .catch(
          (error) => {
            console.log('Error Name: ' + error.name +
            '\nError Message: ' + error.message +
            '\nError Stack: ' + error.stack);

            this.alert = true;

            this.errorMessage = 'Wrong Email and/or Password';
    })
  }else {
    this.alert = true;
    // this.errorMessage = 'Emptyness Is Not Allowed';
    this.errorMessage = 'Type Email and/or password FIRST!';
  }
}

  jsFile() {
    const el: any = document.getElementById('toggleProfile')
    if (el) {
      el.addEventListener('click', function () {
      [].map.call(document.querySelectorAll('.profile'), function(el) {
        el.classList.toggle('profile--open');
      });
    });
    }
  }





}
