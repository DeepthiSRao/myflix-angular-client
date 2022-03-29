import { Injectable } from '@angular/core';
import { HttpClient, 
         HttpHeaders, 
         HttpErrorResponse } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

//Declaring the api Url that will provide data for the client app
const apiUrl = "https://my-flix-movie-api.herokuapp.com";

@Injectable({
  providedIn: 'root'
})

export class FetchApiDataService {
  // Inject the HttpClient module to the constructor params
  // This will provide HttpClient to the entire class, making it available via this.http
  constructor(private http: HttpClient) { }

  // api request for user registration 
  public userRegistration(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http
      .post(apiUrl + '/users', userDetails)
      .pipe(catchError(this.handleError));
  }

  // api request for user login 
  public userLogin(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http
      .post(apiUrl + '/login', userDetails)
      .pipe(catchError(this.handleError));
  }
  
  // api request for get all movies 
  getAllMovies(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + '/movies', {
        headers: new HttpHeaders({
          Authorization: 'Bearer' + token,
        })
      })
      .pipe(
        map(() => this.extractResponseData),
        catchError(this.handleError)
      );
  }

  // api request for get a movies by title
  getMovieByTitle(Title: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + '/movies/' + Title, {
        headers: new HttpHeaders({
          Authorization: 'Bearer' + token,
        })
      })
      .pipe(
        map(() => this.extractResponseData),
        catchError(this.handleError)
      );
  }

  // api request for get a director by director's name
  getDirector(Name: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + '/directors/' + Name, {
        headers: new HttpHeaders({
          Authorization: 'Bearer' + token,
        })
      }).pipe(
        map(() => this.extractResponseData),
        catchError(this.handleError)
      );
  }

  // api request for get a genre by genre's name
  getGenre(Name: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + '/genres/' + Name, {
        headers: new HttpHeaders({
          Authorization: 'Bearer' + token,
        })
      })
      .pipe(
        map(() => this.extractResponseData),
        catchError(this.handleError)
      );
  }

  // api request for get a user's information by users's name
  getUser(Username: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + '/users/' + Username, {
        headers: new HttpHeaders({
          Authorization: 'Bearer' + token,
        })
      })
      .pipe(
        map(() => this.extractResponseData),
        catchError(this.handleError)
      );
  }

  // api request for get a favorite movies list by user's name 
  getFavoriteMovies(Username: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + '/users/' + Username + '/movies',{
        headers: new HttpHeaders({
          Authorization: 'Bearer' + token,
        })
      })
      .pipe(
        map(() => this.extractResponseData),
        catchError(this.handleError)
      );
  }

  // api request for add a movie to user's favorite list 
  addFavoriteMovie(id: any): Observable<any> {
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    
    return this.http
      .post(apiUrl + `/users/${user.Username}/movies/${id}`, null, {
        headers: new HttpHeaders({
          Authorization: 'Bearer' + token,
        })
      })
      .pipe(
        map(() => this.extractResponseData),
        catchError(this.handleError)
      );
  }

  // api request for edit user's info 
  editUser(Username: any, userDetails: any): Observable<any> {
    const token = localStorage.getItem('token');
    
    return this.http
      .put(apiUrl + '/users/' + Username, userDetails, {
        headers: new HttpHeaders({
          Authorization: 'Bearer' + token,
        })
      })
      .pipe(
        map(() => this.extractResponseData),
        catchError(this.handleError)
      );
  }

  // api request for delete the current user
  deleteUser(Username: any): Observable<any> {
    const token = localStorage.getItem('token');
    
    return this.http
      .delete(apiUrl + '/users/' + Username, {
        headers: new HttpHeaders({
          Authorization: 'Bearer' + token,
        })
      })
      .pipe(
        map(() => this.extractResponseData),
        catchError(this.handleError)
      );
  }

  // api request for delete the current user
  deleteFavoriteMovie(MovieId: any): Observable<any> {
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user') || '{}');

    return this.http
      .delete(apiUrl + `/users/${user.Username}/movies/${MovieId}`, {
        headers: new HttpHeaders({
          Authorization: 'Bearer' + token,
        })
      })
      .pipe(
        map(() => this.extractResponseData),
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse): any {
    if(error.error instanceof ErrorEvent){
      console.error('Some error occurred:', error, error.error.message);  
    }else{
      console.error(
        `Error status code: ${error.status} \n` +
        `Error body is: ${error.statusText}`
      );      
    }
    return throwError('Something bad happened; Please try later.');
  }

  // Non-typed response extraction
  private extractResponseData(res: Response): any {
    const body = res;
    return body || {};
  }
}
