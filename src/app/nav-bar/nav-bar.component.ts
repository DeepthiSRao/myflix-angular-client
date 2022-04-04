import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
  constructor(
    public snackBar: MatSnackBar,
    public router: Router
  ) { }

  ngOnInit(): void {
  }

  /* 
    Logout the currewnt user and clear the local storage.
    Then redirect to home page.
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
