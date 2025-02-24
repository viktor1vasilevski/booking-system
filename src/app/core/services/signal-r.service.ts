import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { environment } from '../../../enviroments/enviroment.dev';


@Injectable({
  providedIn: 'root',
})
export class SignalRService {

  private hubConnection!: signalR.HubConnection;
  

  startConnection() {

    const apiKey = environment.apiKey;
    const bookingHubUrl = environment.bookingHubUrl;
    
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(bookingHubUrl, {
        headers: {
          'Authorization': `${apiKey}`,
        },
        transport: signalR.HttpTransportType.LongPolling
      })
      .build();

    this.hubConnection.start().catch(err => console.error(err));
  }

  onMessageReceived(callback: (status: number, message: string) => void) {
    this.hubConnection.on('ReceiveMessage', callback);
  }
}
