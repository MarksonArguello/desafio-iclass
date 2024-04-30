import { Component } from '@angular/core';
import { ServiceOrderService } from '../../../services/service-order.service';
import { ActivatedRoute } from '@angular/router';
import { ServiceOrder } from '../../../model/service-order';

@Component({
  selector: 'app-service-order',
  standalone: true,
  imports: [],
  templateUrl: './service-order.component.html',
  styleUrl: './service-order.component.css',
})
export class ServiceOrderComponent {
  serviceOrder!: ServiceOrder;

  constructor(
    private serviceOrderService: ServiceOrderService,
    private route: ActivatedRoute,
  ) {
    const serviceOrderCode = route.snapshot.paramMap.get('serviceOrderCode') || '';

    serviceOrderService.findByServiceOrderCode(serviceOrderCode).subscribe((response) => {
      this.serviceOrder = response.objects[0];
    });
  }
}
