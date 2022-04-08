/**
 * The UserProfileComponent renders mat card with user details, edit/delete buttons and list of favorite movie card. Movie mat card
 * has director, genre, synposis and delete buttons.
 * @module UserProfileComponent
 */
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

  /**
   * Injecting FetchApiDataService, MatDialog, MatSnackBar and Router dependency into UserProfileComponent contructor.
   * @param fetchDataApi Api Service Class
   * @param dialog Class used to show dialogs 
   * @param snackBar Class used to show notification
   * @param router Class that provides navigation among views
   */ 
  constructor(
    public fetchDataApi: FetchApiDataService,
    public snackBar: MatSnackBar,
    public dialog: MatDialog,
    public router: Router,
  ) { }

  /**
   * Calls getInitData during component initialize to populate the data.
   */
  ngOnInit(): void {
    this.getInitData();
  }

  /**
   * Invokes getAllMovies api with movieID and user data. Response returns an array of movie objects and user favorite movie list 
   * is filtered.
   * @function getInitData
   */
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

  /**
   * Opens a dialog to display the Genre component.
   * @function openGenreDialog
   * @param name Genre of the movie clicked
   * @param description Description of the movie clicked  
   */
  openGenreDialog(name: string, description: string): void {
    this.dialog.open(GenreCardComponent, {
      data: { name, description},
      width: '300px',
    });
  }

  /**
   * Opens a dialog to display the Director component.
   * @function openDirectorDialog
   * @param name Director name of the movie clicked
   * @param bio Director bio of the movie clicked  
   * @param birth Director birthdate of the movie clicked  
   * @param death Director deathdate of the movie clicked  
   */
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

  /**
   * Converts date from string to Date object format
   * @function getFormatedDate
   * @param date Date in string
   * @param format Required date format   
   */
  getFormatedDate(date: any, format: string) {
    const datePipe = new DatePipe('en-US');
    return datePipe.transform(date, format);
  }

  /**
   * Opens a dialog to display the Synposis component.
   * @function openSynposisDialog
   * @param title Title of the movie clicked
   * @param description Description of the movie clicked  
   */
  openSynposisDialog(title: string, description: string): void {
    this.dialog.open(SynposisCardComponent, {
      data: { title, description},
      width: '300px'
    });
  }

  /**
   * Opens a dialog to display the Edit User component.
   * @function openEditUserForm
   */
  openEditUserForm(): void{
    this.dialog.open(EditUserComponent, {
      width: '280px',
    });
  }

  /**
   * Invokes deleteUser api with Username. If user is successfully deregistred, User deleted successfully message is popped
   * and local storage is cleared. Router navigates to home route.
   * @function deleteFavoriteMovie
   */
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

  /**
   * Invokes deleteFavoriteMovie api with movieID and user data. Api returns a user object with updated favorite list. 
   * If successful, updates a user object on local storage and shows a popup message after removing movie from user favorite list.
   * @function deleteFavoriteMovie
   * @param movie movie object clicked
   */
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
