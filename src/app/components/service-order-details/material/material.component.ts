import { Component } from '@angular/core';
import { OsMaterial } from '../../../model/osmaterial';
import { ServiceOrderService } from '../../../services/service-order.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-material',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './material.component.html',
  styleUrl: './material.component.css',
})
export class MaterialComponent {
  materialList: OsMaterial[] = [];

  constructor(
    private serviceOrderService: ServiceOrderService,
    private route: ActivatedRoute,
  ) {
    const serviceOrderCode = route.snapshot.paramMap.get('serviceOrderCode') || '';

    serviceOrderService.findMaterialsByServiceOrderCode(serviceOrderCode).subscribe((response) => {
      this.materialList = response.objects;
    });
  }
}
