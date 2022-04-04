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

  constructor(
    public fetchDataApi: FetchApiDataService,
    public snackBar: MatSnackBar,
    public dialog: MatDialogRef<EditUserComponent>,
  ) {}

  ngOnInit(): void {
    this.getUser();
  }

  // format date
  getFormatedDate(date: Date, format: string) {
    const datePipe = new DatePipe('en-US');
    return datePipe.transform(date, format);
  }

  getUser(): void{
    this.user = JSON.parse(localStorage.getItem('user') || '{}');
  }

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
