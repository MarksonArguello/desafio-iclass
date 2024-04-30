import { Component } from '@angular/core';
import { ServiceOrderService } from '../../../services/service-order.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ServiceOrderHistory } from '../../../model/history';

@Component({
  selector: 'app-history',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './history.component.html',
  styleUrl: './history.component.css',
})
export class HistoryComponent {
  historyList: ServiceOrderHistory[] = [];

  constructor(
    private serviceOrderService: ServiceOrderService,
    private route: ActivatedRoute,
  ) {
    const serviceOrderCode = route.snapshot.paramMap.get('serviceOrderCode') || '';

    serviceOrderService.findHistoryByServiceOrderCode(serviceOrderCode).subscribe((response) => {
      this.historyList = response.objects;
    });
  }
}
