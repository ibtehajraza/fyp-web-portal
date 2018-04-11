import { AppRouter } from './app.routing';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  isAuth:boolean
  constructor(  public router: Router , public afAuth: AngularFireAuth ) {
    // router.navigate(['doctor']);

    this.afAuth.authState.subscribe(
      (auth) => {
        if (auth != null) {
                // this.nnm = auth.email;
                console.log('auth: ' + auth.email);
                // this.router.navigate(['/home']);
                this.router.navigate(['home'])
                this.isAuth = true
                
        }else{
          this.isAuth = false
        }
      }
    );

  }

  onChange(){
    this.afAuth.auth.signOut().catch(
      function(error){
        console.log('Error Name: ' + error.name +
        '\nError Message: ' + error.message +
        '\nError Stack: ' + error.stack);
      }
    );
    this.router.navigate(['login'])
  }
}
