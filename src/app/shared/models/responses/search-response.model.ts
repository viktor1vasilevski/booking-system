import { SearchTypeEnum } from "../../enums/search-type.enum";
import { Option } from "../options.model"

export interface SearchResponse {
  options: Option[];
  searchType: SearchTypeEnum;
}