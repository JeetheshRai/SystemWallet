import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../config';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private server_api_endpoint: string = environment.server_api_endpoint
  constructor(private http: HttpClient) {
  }

  private createHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
    });
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(() => new Error(errorMessage));
  }

  get<T>(path: string): Observable<T> {
    return this.http
      .get<T>(this.server_api_endpoint + path, { headers: this.createHeaders() })
      .pipe(
        map((response) => response),
        catchError(this.handleError)
      );
  }

  post<T>(path: string, body: any): Observable<T> {
    return this.http
      .post<T>(this.server_api_endpoint + path, body, { headers: this.createHeaders() })
      .pipe(
        map((response) => response),
        catchError(this.handleError)
      );
  }

}
