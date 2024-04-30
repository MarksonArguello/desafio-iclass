import { Component } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { HistoryComponent } from './history/history.component';
import { ProcedureComponent } from './procedure/procedure.component';
import { MaterialComponent } from './material/material.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-service-order-details',
  standalone: true,
  imports: [MatTabsModule, HistoryComponent, ProcedureComponent, MaterialComponent],
  templateUrl: './service-order-details.component.html',
  styleUrl: './service-order-details.component.css',
})
export class ServiceOrderDetailsComponent {
  serviceOrderCode: string = '';

  constructor(private route: ActivatedRoute) {
    this.serviceOrderCode = route.snapshot.paramMap.get('serviceOrderCode') || '';
  }
}
