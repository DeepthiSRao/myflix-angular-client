/**
 * The UserRegistrationFormComponent is show registration form for new user to signup.
 * @module UserRegistrationFormComponent
 */
import { Component, Input, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
// fetch data from api
import { FetchApiDataService } from '../fetch-api-data.service';

@Component({
  selector: 'app-user-registration-form',
  templateUrl: './user-registration-form.component.html',
  styleUrls: ['./user-registration-form.component.scss']
})
export class UserRegistrationFormComponent implements OnInit {
  @Input()
  userData = {
    Username: '',
    Password: '',
    Email: '',
    Birthday: ''
  };

  /**
   * Injecting FetchApiDataService, MatDialog, MatSnackBar and Router dependency into UserRegistrationFormComponent contructor.
   * @param fetchDataApi Api Service Class
   * @param dialog Class used to show dialogs 
   * @param snackBar Class used to show notification
   */ 
  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserRegistrationFormComponent>,
    public snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
  }

   /**
   * Invokes registerUser fetchDataApi service and creates a new user. After successful signup, closes the dialog and a popup is 
   * displayed confirming registration success. If unsuccessful, a popup message asks the user to check the data entered.
   * @function registerUser
   */
  registerUser(): void {
    this.fetchApiData
        .userRegistration(this.userData)
        .subscribe((response) => {
          // on successful user registration, close registration modal
          this.dialogRef.close();
          // show registration successful message
          this.snackBar.open('User Registration was successful!!', 'OK', {
            duration: 2000,
          });
        }, 
        (response) => {
          this.snackBar.open("Registration failed. Please check your data entered", 'OK', {
            duration: 2000,
          });
        });
  }
}
