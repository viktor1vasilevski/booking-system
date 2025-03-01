import { NotificationTypeEnum } from "../../enums/notification-type.enum";

export interface ApiResponse<T>  {
    data: T | null;
    success: boolean;
    message: string | null;
    errors: { [key: string]: string[] } | null;
    notificationType: NotificationTypeEnum;
}