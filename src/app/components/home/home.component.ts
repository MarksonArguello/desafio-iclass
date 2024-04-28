import { Component } from '@angular/core';
import { ServiceOrderService } from '../../services/service-order.service';
import { ServiceOrder } from '../../model/service-order';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  formulario!: FormGroup;
  seviceOrderList: ServiceOrder[] = [];
  page: number = 1;
  loading = false;

  constructor(
    private seviceOrderService: ServiceOrderService,
    private formBuilder: FormBuilder,
  ) {}

  ngOnInit() {
    this.formulario = this.formBuilder.group({
      serviceOrderCode: [''],
    });
  }

  findByServiceOrderCode() {
    this.page = 1;
    this.loading = true;
    this.findByServiceOrderCodeAndPage(this.f().serviceOrderCode, this.page);
  }

  private findByServiceOrderCodeAndPage(serviceOrderCode: string, page: number) {
    this.seviceOrderService.findByServiceOrderCode(serviceOrderCode, page).subscribe((PaginatedResponse) => {
      this.seviceOrderList = PaginatedResponse.objects;
      this.loading = false;
    });
  }

  private f() {
    return this.formulario.value;
  }
}
