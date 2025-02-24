import { Injectable } from '@angular/core';
import { environment } from '../../../enviroments/enviroment.dev';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BookRequest } from '../../shared/models/requests/book-request.model';
import { ApiResponse } from '../../shared/models/responses/api-response.model';
import { BookResponse } from '../../shared/models/responses/book-response.model';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}


  book(bookRequest: BookRequest): Observable<ApiResponse<BookResponse>> {
    return this.http.post<ApiResponse<BookResponse>>(`${this.baseUrl}/book/book`, bookRequest);
  }
}
