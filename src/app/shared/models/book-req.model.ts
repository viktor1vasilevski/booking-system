import { SearchReq } from "./search-req.model";

export interface BookReq {
    optionCode: string;
    searchReq: SearchReq;
  }