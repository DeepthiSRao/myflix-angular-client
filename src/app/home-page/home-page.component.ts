/**
 * The HomePageComponent renders Welcome message, signup and login button. 
 * OnClick of login button, login form will be showed in mat dialog. 
 * OnClick of signup button, signup form will be showed in mat dialog. 
 * @module HomePageComponent
 */
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
  /**
   * Injecting FetchApiDataService, MatDialog and MatSnackBar dependency into MovieCardComponent contructor.
   * @param dialog Class used to show dialogs 
   */ 
  constructor(
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
  }

   /**
   * Opens a dialog to display the Login component.
   * @function openUserRegistrationDialog 
   */
  openUserRegistrationDialog(): void{
    this.dialog.open(UserRegistrationFormComponent, {
      // assigning dialog width
      width: '480px'
    });
  }

   /**
   * Opens a dialog to display the Login component.
   * @function openUserLoginDialog 
   */
  openUserLoginDialog(): void{
    this.dialog.open(UserLoginFormComponent, {
      // assigning dialog width
      width: '480px'
    });
  }
}
