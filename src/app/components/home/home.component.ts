import { Component } from '@angular/core';
import { ServiceOrderService } from '../../services/service-order.service';
import { ServiceOrder } from '../../model/service-order';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  seviceOrderList: ServiceOrder[] = [];
  page: number = 1;

  constructor(private seviceOrderService: ServiceOrderService) {}

  ngOnInit() {}

  findByServiceOrderCode(serviceOrderCode: string, page: number) {
    this.seviceOrderService.findByServiceOrderCode(serviceOrderCode, page).subscribe((PaginatedResponse) => {
      this.seviceOrderList = PaginatedResponse.objects;
    });
  }
}
