import { DatePipe } from '@angular/common';
import { EditUserComponent } from './../edit-user/edit-user.component';
import { SynposisCardComponent } from './../synposis-card/synposis-card.component';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FetchApiDataService } from './../fetch-api-data.service';
import { GenreCardComponent } from './../genre-card/genre-card.component';
import { DirectorCardComponent } from '../director-card/director-card.component';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  user: any = {};
  favoriteMovies: any[] = [];

  constructor(
    public fetchDataApi: FetchApiDataService,
    public snackBar: MatSnackBar,
    public dialog: MatDialog,
    public router: Router,
  ) { }

  ngOnInit(): void {
    this.getInitData();
  }

  getInitData(): void{
    this.user = JSON.parse(localStorage.getItem('user') || '{}');  
    const userFavList = this.user.FavoriteMovies;

    // fetching movies data and filter user favorite movies
    this.fetchDataApi
        .getAllMovies()
        .subscribe((resp: any) => {
          this.favoriteMovies = resp.filter((movie: any) => userFavList.includes(movie._id));
          return this.favoriteMovies;          
        });
  }

  // open a dialog to dispaly Genre details
  openGenreDialog(name: string, description: string): void {
    this.dialog.open(GenreCardComponent, {
      data: { name, description},
      width: '300px',
    });
  }

  // open a dialog to display director details
  openDirectorDialog( 
    name: string, 
    bio: string ,
    birth: string,
    death: string 
  ) : void {
    death = (death === undefined) ? 'N/A' : death;
    birth = this.getFormatedDate(birth,'MM-dd-yyyy') || 'null';
    this.dialog.open(DirectorCardComponent, {
      data: { name, bio, birth, death },
      width: '300px'
    });
  }

  // format date
  getFormatedDate(date: any, format: string) {
    const datePipe = new DatePipe('en-US');
    return datePipe.transform(date, format);
  }

  // open a dialog to display movie deatils
  openSynposisDialog(title: string, description: string): void {
    this.dialog.open(SynposisCardComponent, {
      data: { title, description},
      width: '300px'
    });
  }

  // open a dialog to edit user details
  openEditUserForm(): void{
    this.dialog.open(EditUserComponent, {
      width: '280px',
    });
  }

  // api request to delete current signed in user
  deleteUser(): void{
    const { Username } = this.user;

    this.fetchDataApi
        .deleteUser(Username)
        .subscribe((resp) => {
          this.snackBar.open(`${Username} has been deleted successfully!`, 'OK',{
            duration: 5000,
          });
          localStorage.clear();
        });
    this.router.navigate(['home']);
  }

  // api request for deleting movie to user favorite list
  deleteFavoriteMovie(movie: any): void{
    const movieId = movie._id;
    const title = movie.Title;

    this.fetchDataApi
        .deleteFavoriteMovie(movieId)
        .subscribe((resp) => {
          localStorage.setItem('user', JSON.stringify(resp));
          this.snackBar.open( `${title} has been removed from your favorite list`, 'OK', {
            duration: 2000,
          });
          this.ngOnInit();
        });
  }
}
