import { Injectable } from '@angular/core';
import { environment } from '../../../enviroments/enviroment.dev';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BookReq } from '../../shared/models/book-req.model';
import { ApiResponse } from '../../shared/models/api-response';
import { BookRes } from '../../shared/models/book-res.model';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}


  book(bookReq: BookReq): Observable<ApiResponse<BookRes>> {
    return this.http.post<ApiResponse<BookRes>>(`${this.baseUrl}/book/book`, bookReq);
  }
}
