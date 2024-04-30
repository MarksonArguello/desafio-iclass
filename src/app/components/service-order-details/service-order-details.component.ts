import { Component } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { HistoryComponent } from './history/history.component';

@Component({
  selector: 'app-service-order-details',
  standalone: true,
  imports: [MatTabsModule, HistoryComponent],
  templateUrl: './service-order-details.component.html',
  styleUrl: './service-order-details.component.css',
})
export class ServiceOrderDetailsComponent {}
