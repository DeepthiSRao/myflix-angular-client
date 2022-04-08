/**
 * The EditUserComponent fetches user information stored in local storage and renders edit user form with fetched data to be 
 * updated.
 * @module EditUserComponent
 */
import { MatSnackBar } from '@angular/material/snack-bar';
import { FetchApiDataService } from './../fetch-api-data.service';
import { Component, Input, OnInit } from '@angular/core';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {
  user: any = JSON.parse(localStorage.getItem('user') || '{}');

  @Input()
  userData = {
    Username: this.user.Username,
    Password: '',
    Email: this.user.Email,
    Birthday: this.getFormatedDate(this.user.Birthday,'yyyy-MM-dd'),
  };

  /**
   * Injecting FetchApiDataService, MatDialog and MatSnackBar dependency into MovieCardComponent contructor.
   * @param fetchDataApi Api Service Class
   * @param dialog Class used to show dialogs 
   * @param snackBar Class used to show notification
   */ 
  constructor(
    public fetchDataApi: FetchApiDataService,
    public snackBar: MatSnackBar,
    public dialog: MatDialogRef<EditUserComponent>,
  ) {}

  /**
   * Calls the getUser method during component initialize to populate the data.
   */  
  ngOnInit(): void {
    this.getUser();
  }

  // format date
  getFormatedDate(date: Date, format: string) {
    const datePipe = new DatePipe('en-US');
    return datePipe.transform(date, format);
  }

  
  /** 
   * Invokes the getUser method to fetch the user object stored in local storage. 
   * @function getUser
   * @returns an user object
   */ 
  getUser(): void{
    this.user = JSON.parse(localStorage.getItem('user') || '{}');
  }

  /**
   * Invokes editUser api with user name and user form data. 
   * Updates user object on local storage.
   * @function updateUser
   * @returns object with updated user data  
   */
  updateUser(): void{    
    this.fetchDataApi
        .editUser(this.user.Username, this.userData)
        .subscribe(resp =>{
          this.dialog.close();
          console.log(resp);
          
          // update local storage
          localStorage.setItem('user', JSON.stringify(resp));

          this.snackBar.open('Profile data updated successfully', 'OK',{
            duration: 4000,
          });
          window.location.reload();
        })
  }
}
