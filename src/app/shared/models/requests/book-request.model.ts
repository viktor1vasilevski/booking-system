import { SearchRequest } from "./search-request.model";

export interface BookRequest {
    optionCode: string;
    searchRequest: SearchRequest;
  }