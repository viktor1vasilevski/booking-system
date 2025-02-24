export interface SearchRequest {
    destination: string;
    departureAirport?: string;
    fromDate?: Date;
    toDate?: Date;
  }