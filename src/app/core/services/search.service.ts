import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../enviroments/enviroment.dev';
import { ApiResponse } from '../../shared/models/api-response';
import { SearchRes } from '../../shared/models/search-res.model';
import { SearchReq } from '../../shared/models/search-req.model';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}


  search(searchReq: SearchReq): Observable<ApiResponse<SearchRes>> {
    return this.http.post<ApiResponse<SearchRes>>(`${this.baseUrl}/search/search`, searchReq);
  }

}
