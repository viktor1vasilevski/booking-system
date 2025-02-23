import { Injectable } from '@angular/core';
import { environment } from '../../../enviroments/enviroment.dev';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CheckStatusService {

  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  checkBookingStatus(bookingCode: string): Observable<string> {
    const params = new HttpParams().set('bookingCode', bookingCode);
    return this.http.get<any>(`${this.baseUrl}/checkstatus/checkstatus`, { params });
  }
  
}
