import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../enviroments/enviroment.dev';
import { SearchRequest } from '../../shared/models/requests/search-request.model';
import { ApiResponse } from '../../shared/models/responses/api-response.model';
import { SearchResponse } from '../../shared/models/responses/search-response.model';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}


  search(searchRequest: SearchRequest): Observable<ApiResponse<SearchResponse>> {
    return this.http.post<ApiResponse<SearchResponse>>(`${this.baseUrl}/search/search`, searchRequest);
  }

}
