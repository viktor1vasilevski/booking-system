import { BookingStatusEnum } from "../../enums/booking-status.enum";
import { Option } from "../options.model";


export interface CheckStatusResponse {
    options: Option[];
    status: BookingStatusEnum;
}