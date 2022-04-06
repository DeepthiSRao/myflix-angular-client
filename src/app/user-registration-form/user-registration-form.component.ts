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

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserRegistrationFormComponent>,
    public snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
  }

  // onClick of registration button send data to the backend
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
