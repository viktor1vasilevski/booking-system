import { BookingStatusEnum } from "../../enums/booking-status.enum";

export interface CheckStatusResponse {
  status: BookingStatusEnum;
}