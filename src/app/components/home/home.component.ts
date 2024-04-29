import { Component } from '@angular/core';
import { ServiceOrderService } from '../../services/service-order.service';
import { ServiceOrder } from '../../model/service-order';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AdvancedSearchComponent } from './advanced-search/advanced-search.component';
import { AdvancedSearchParams } from '../../model/advanced-search-params';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, AdvancedSearchComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  formulario!: FormGroup;
  seviceOrderList: ServiceOrder[] = [];
  page: number = 1;
  loading = false;
  submitted = false;
  error = '';

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
    this.submitted = true;
    this.findByServiceOrderCodeAndPage(this.f().serviceOrderCode, this.page);
  }

  private findByServiceOrderCodeAndPage(serviceOrderCode: string, page: number) {
    this.seviceOrderService.findByServiceOrderCode(serviceOrderCode, page).subscribe((paginatedResponse) => {
      this.seviceOrderList = [];
      this.loading = false;

      if (paginatedResponse) this.seviceOrderList = paginatedResponse.objects;
    });
  }

  findByFilters(advancedSearchParams: AdvancedSearchParams) {
    this.page = 1;
    this.loading = true;
    this.error = '';
    this.seviceOrderList = [];

    this.findByFiltersAndPage(advancedSearchParams, this.page);
  }

  private findByFiltersAndPage(advancedSearchParams: AdvancedSearchParams, page: number) {
    this.seviceOrderService.findByFilters(advancedSearchParams, page).subscribe(
      (paginatedResponse) => {
        this.loading = false;
        this.submitted = true;

        if (paginatedResponse) this.seviceOrderList = paginatedResponse.objects;
      },
      (error) => {
        console.log(error);
        this.error = `Erro ao buscar ordens de serviço`;
        this.loading = false;
      },
    );
  }

  private f() {
    return this.formulario.value;
  }
}
