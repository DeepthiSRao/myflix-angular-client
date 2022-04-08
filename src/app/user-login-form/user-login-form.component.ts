/**
 * The UserLoginFormComponent is show login form for entering user credentials.
 * @module UserLoginFormComponent
 */
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogRef } from '@angular/material/dialog';
import { FetchApiDataService } from './../fetch-api-data.service';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-login-form',
  templateUrl: './user-login-form.component.html',
  styleUrls: ['./user-login-form.component.scss']
})
export class UserLoginFormComponent implements OnInit {
  @Input()
  userData = {
    Username: '',
    Password: '',
  };

  /**
   * Injecting FetchApiDataService, MatDialog, MatSnackBar and Router dependency into UserLoginFormComponent contructor.
   * @param fetchDataApi Api Service Class
   * @param dialog Class used to show dialogs 
   * @param snackBar Class used to show notification
   * @param router Class that provides navigation among views
   */ 
  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserLoginFormComponent>,
    public snackBar: MatSnackBar,
    public router: Router,
  ) { }

  ngOnInit(): void {
  }

 /**
   * Invokes userLogin fetchDataApi service and authenticates the user credentials. After successful login, navigates to movies route. From response
   * userID, auth Token and user data is extrcated and stored in local storage. A popup is displayed confirming login success. If unsuccessful, a 
   * popup message asks the user to check their username and password.
   * @function loginUser
   */
  loginUser(): void {
    this.fetchApiData
        .userLogin(this.userData)
        .subscribe((response) => {
          console.log(response);
          // Set local storage after a successful user login
          localStorage.setItem('token', response.token);
          localStorage.setItem('UserID', response.user._id);
          localStorage.setItem('user', JSON.stringify(response.user));

          // on login success
          this.dialogRef.close();
          // show success message
          this.snackBar.open('User Login was successful!!', 'OK', {
            duration: 2000,
          });

          this.router.navigate(['movies']);
        },
        (response) => {
          this.snackBar.open("Login failed. Please check your username and password", 'OK', {
            duration: 2000,
          });
        });
  }
}
