import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { SearchService } from '../../core/services/search.service';
import { ErrorHandlerService } from '../../core/services/error-handler.service';
import { NotificationService } from '../../core/services/notification.service';
import { BookingService } from '../../core/services/booking.service';
import { CheckStatusService } from '../../core/services/check-status.service';
import { Option } from '../../shared/models/options.model';
import { SignalRService } from '../../core/services/signal-r.service';
import { SearchTypeEnum } from '../../shared/enums/search-type.enum';
import { SearchRequest } from '../../shared/models/requests/search-request.model';
import { ApiResponse } from '../../shared/models/responses/api-response.model';
import { BookResponse } from '../../shared/models/responses/book-response.model';
import { SearchResponse } from '../../shared/models/responses/search-response.model';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent implements OnInit {

  searchResults?: SearchResponse;
  options: Option[] = [];
  bookingInProgress: string | null = null;

  searchRequest!: SearchRequest;
  loading: boolean = false;
  showColumnFlightInfo: boolean = false;
  today: string = '';
  minToDate: string = '';

  searchForm: FormGroup;

  constructor(private fb: FormBuilder,
    private _searchService: SearchService,
    private _bookingService: BookingService,
    private _checkStatusService: CheckStatusService,
    private _errorHandlerService: ErrorHandlerService,
    private _notificationService: NotificationService,
    private _signalRService: SignalRService,
  ) {
    this.searchForm = this.fb.group({
      destination: ['', [Validators.required]],
      fromDate: ['', [Validators.required]],
      toDate: ['', [Validators.required]],
      departureAirport: [null],
    })
  }

  ngOnInit() {
    this._signalRService.startConnection();
    this._signalRService.onMessageReceived((status, message) => {
      this.bookingInProgress = null;
      switch (status) {
        case 0:
          this._notificationService.success(message);
          break;
        case 1:
          this._notificationService.error(message);
          break;
        case 2:
          this._notificationService.info(message);
          break;
        default:
          this._notificationService.warning("Something went wrong. Please try again later.");
          break;
      }
      
    });

    this.setTodayDate();
  }
  
  setTodayDate() {
    const now = new Date();
    this.today = now.toISOString().split('T')[0];
  }
  
  onFromDateChange() {
    const fromDate = this.searchForm.get('fromDate')?.value;
    if (fromDate) {
      this.minToDate = fromDate;
    }
  }

  onSubmit() {
    if(!this.searchForm.valid) {
      this._notificationService.info('Invalid Form');
      return;
    }
    this.loading = true;
    this.searchRequest = this.searchForm.value;
    this._searchService.search(this.searchRequest).subscribe({
      next: (response: ApiResponse<SearchResponse>) => {
        if(response && response.success && response.data) {
          this.options = response.data.options;
          response.data.searchType == SearchTypeEnum.HotelAndFlight ? this.showColumnFlightInfo = true : this.showColumnFlightInfo = false;
          this.loading = false;
        } else {
          this._notificationService.error(response?.message as string);
          this.loading = false;
        }
      },
      error: (errorResponse: ApiResponse<SearchResponse>) => {
        this._errorHandlerService.handleErrors(errorResponse);
        this.loading = false;
      }
    })
  }

  onBook(optionCode: string): void {
    const bookRequest = {
      optionCode,
      searchRequest: this.searchRequest
    };
    this.bookingInProgress = optionCode;
    this._bookingService.book(bookRequest).subscribe({
      next: (response: ApiResponse<BookResponse>) => this.handleBookingResponse(response),
      error: (errorResponse: ApiResponse<BookResponse>) => this._errorHandlerService.handleErrors(errorResponse)
    });
   
  }
  
  private handleBookingResponse(response: any): void {
    if (response?.success && response.data?.bookingCode) {
      const bookingCode = response.data.bookingCode;
      this.checkBookingStatus(bookingCode);
    } else {
      this._notificationService.error(response?.message);
    }
    
  }
  
  private checkBookingStatus(bookingCode: string): void {
    this._checkStatusService.checkBookingStatus(bookingCode).subscribe({
      next: (response: any) => {
        const message = response.message;
        response?.data ? this._notificationService.info(message) : this._notificationService.error(message);
      },
      error: (errorResponse: any) => {
        this._errorHandlerService.handleErrors(errorResponse);
      }
    });

  }
  
  

}
