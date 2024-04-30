import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ServiceOrderService } from '../../../services/service-order.service';
import { ActivatedRoute } from '@angular/router';
import { Procedure } from '../../../model/procedure';

@Component({
  selector: 'app-procedure',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './procedure.component.html',
  styleUrl: './procedure.component.css',
})
export class ProcedureComponent {
  procedureList: Procedure[] = [];

  constructor(
    private serviceOrderService: ServiceOrderService,
    private route: ActivatedRoute,
  ) {
    const serviceOrderCode = route.snapshot.paramMap.get('serviceOrderCode') || '';

    serviceOrderService.findProcedureByServiceOrderCode(serviceOrderCode).subscribe((response) => {
      this.procedureList = response.objects;
    });
  }
}
