import { Option } from "../models/options.model"
import { SearchType } from "../enums/search-type.enum";


export interface SearchRes {
    options: Option[];
    searchType: SearchType;
  }