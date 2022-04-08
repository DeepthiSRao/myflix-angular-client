/**
 * The FetchApiDataService is a service class used to make Http requests to the Backend myFlix App. 
 * @module FetchApiDataService
 */
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
  /**
   * Inject the HttpClient module to the constructor params.This will provide 
   * HttpClient to the entire class, making it available via this.http
   */
  constructor(private http: HttpClient) { }

  /**
   * Function userRegistration makes an API request to the users register endpoint.
   * @function userRegistration
   * @method POST
   * @param userDetails user object
   * @returns a json user object
   */
  public userRegistration(userDetails: any): Observable<any> {
    return this.http
      .post(apiUrl + '/users', userDetails)
      .pipe(catchError(this.handleError));
  }

  /**
   * Function userLogin makes an API request to the users login endpoint.
   * @function userLogin
   * @method POST
   * @param userDetails user object
   * @returns a json user object
   */
  public userLogin(userDetails: any): Observable<any> {
    return this.http
      .post(apiUrl + '/login', userDetails)
      .pipe(catchError(this.handleError));
  }
  
  /**
    * Function getAllMovies makes an API request to the getAllMovies endpoint with JWT token.
    * @function getAllMovies
    * @method GET
    * @returns an array of json movie objects
    */
  getAllMovies(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + '/movies', {
        headers: new HttpHeaders({
          Authorization: `Bearer ${token}`,
        })
      })
      .pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      );
  }

 /**
  * Function getMovieByTitle makes an API request to the getAllMovies endpoint with Title and JWT token.
  * @function getMovieByTitle
  * @method GET
  * @param Title movie Title
  * @returns An movie object whose title matched
  */
  getMovieByTitle(Title: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + '/movies/' + Title, {
        headers: new HttpHeaders({
          Authorization: `Bearer ${token}`,
        })
      })
      .pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      );
  }

  /**
    * Function getDirector makes an API request to the getDirector endpoint with Name and JWT token.
    * @function getDirector
    * @method GET
    * @param Name of director
    * @returns An director object whose name is matched
    */
  getDirector(Name: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + '/directors/' + Name, {
        headers: new HttpHeaders({
          Authorization: `Bearer ${token}`,
        })
      }).pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      );
  }

  /**
    * Function getGenre makes an API request to the getGenre endpoint with Name and JWT token.
    * @function getGenre
    * @method GET
    * @param Name of Genre
    * @returns An genre object whose name is matched
    */
  getGenre(Name: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + '/genres/' + Name, {
        headers: new HttpHeaders({
          Authorization: `Bearer ${token}`,
        })
      })
      .pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      );
  }

  /**
    * Function addFavoriteMovie makes an API request to the addFavoriteMovie endpoint with MovieID, Username and JWT token.
    * @function addFavoriteMovie
    * @method POST
    * @param id Movie ID
    * @returns An json user object with updated favorite list
    */
  addFavoriteMovie(id: any): Observable<any> {
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    
    return this.http
      .post(apiUrl + `/users/${user.Username}/movies/${id}`, null, {
        headers: new HttpHeaders({
          Authorization: `Bearer ${token}`,
        })
      })
      .pipe(        
        map(this.extractResponseData),
        catchError(this.handleError)
      );
  }

   /**
    * Function editUser makes an API request to the editUser endpoint with Username, UserDetails and JWT token.
    * @function editUser
    * @method PUT
    * @param Username 
    * @param userDetails user object
    * @returns A JSON Object holding data about the updated user
    */ 
  editUser(Username: any, userDetails: any): Observable<any> {
    const token = localStorage.getItem('token');
    
    return this.http
      .put(apiUrl + '/users/' + Username, userDetails, {
        headers: new HttpHeaders({
          Authorization: `Bearer ${token}`,
        })
      })
      .pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      );
  }

  /**
    * Function deleteUser makes an API request to the deleteUser endpoint with Username and JWT token.
    * @function deleteUser
    * @method DELETE
    * @param Username 
    * @returns A text message: {Username} was deleted.
    */ 
  deleteUser(Username: any): Observable<any> {
    const token = localStorage.getItem('token');
    
    return this.http
      .delete(apiUrl + '/users/' + Username, {
        headers: new HttpHeaders({
          Authorization: `Bearer ${token}`,
        })
      })
      .pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      );
  }

  /**
    * Function deleteFavoriteMovie makes an API request to the deleteFavoriteMovie endpoint with MovieID, Username and JWT token.
    * @function deleteFavoriteMovie
    * @method DELETE
    * @param MovieId Movie ID
    * @returns An json user object with updated favorite list after removing movieID
    */
  deleteFavoriteMovie(MovieId: any): Observable<any> {
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user') || '{}');

    return this.http
      .delete(apiUrl + `/users/${user.Username}/movies/${MovieId}`, {
        headers: new HttpHeaders({
          Authorization: `Bearer ${token}`,
        })
      })
      .pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      );
  }

  /**
   * Handles error responses to Http requests.
   * @param error The HttpErrorResponse returned on the Observable's response stream.
   * @returns An observable that errors with the specified message.
   */
  private handleError(error: HttpErrorResponse): any {
    console.log('Error:', error);
    
    if(error.error instanceof ErrorEvent){
      console.error('Some error occurred:', error.error.message);  
    }else{
      console.error(
        `Error status code: ${error.status} \n` +
        `Error body is: ${error.statusText}`
      );      
    }
    return throwError('Something bad happened; Please try later.');
  }

  // Non-typed response extraction
  private extractResponseData(res: any): any {
    const body = res;
    return body || {};
  }
}
