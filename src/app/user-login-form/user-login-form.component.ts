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

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserLoginFormComponent>,
    public snackBar: MatSnackBar,
    public router: Router,
  ) { }

  ngOnInit(): void {
  }

  //onClick of login button 
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
          this.snackBar.open(response, 'OK', {
            duration: 2000,
          });
        });
  }
}
