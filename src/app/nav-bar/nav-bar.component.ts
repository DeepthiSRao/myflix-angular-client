/**
 * The NavBarComponent renders list of route component to navigate and a logout button 
 * @module NavBarComponent
 */
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
  /**
   * Injecting FetchApiDataService, MatDialog and MatSnackBar dependency into MovieCardComponent contructor.
   * @param snackBar Class used to show notification
   * @param router Class that provides navigation among views
   */
  constructor(
    public snackBar: MatSnackBar,
    public router: Router
  ) { }

  ngOnInit(): void {
  }

  /**
   * On click of logout button, user is  logged out, local storage is cleared and user navigates to home route. 
   * @function userLogout 
   */
  userLogout(): void {
    localStorage.clear();
    this.snackBar.open ('User successfully logged out!', 'OK', {
      duration: 2000,
    });
    this.router.navigate(['/home']).then(() => {
      window.location.reload();
    });
  }
}
