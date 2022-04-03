import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserLoginFormComponent } from '../user-login-form/user-login-form.component';
import { UserRegistrationFormComponent } from './../user-registration-form/user-registration-form.component';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {
  }

  // This function will open the dialog when signup button is clicked
  openUserRegistrationDialog(): void{
    this.dialog.open(UserRegistrationFormComponent, {
      // assigning dialog width
      width: '280px'
    });
  }

  // This function will open the dialog when signup button is clicked
  openUserLoginDialog(): void{
    this.dialog.open(UserLoginFormComponent, {
      // assigning dialog width
      width: '280px'
    });
  }
}
