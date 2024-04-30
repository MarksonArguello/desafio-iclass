import { Component } from '@angular/core';
import { ServiceOrderService } from '../../services/service-order.service';
import { ServiceOrder } from '../../model/service-order';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AdvancedSearchComponent } from './advanced-search/advanced-search.component';
import { AdvancedSearchParams } from '../../model/advanced-search-params';
import { SimpleSearchComponent } from './simple-search/simple-search.component';
import { PaginatedResponse } from '../../model/paginated-response';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, AdvancedSearchComponent, SimpleSearchComponent],
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

  hasMore = false;
  usingSimpleSearch = true;
  simpleSearchValue = '';
  advancedSearchParams!: AdvancedSearchParams;

  constructor(
    private seviceOrderService: ServiceOrderService,
    private formBuilder: FormBuilder,
    private router: Router,
  ) {}

  ngOnInit() {
    this.formulario = this.formBuilder.group({
      serviceOrderCode: [''],
    });
  }

  redirectToDetails(serviceOrderCode: string) {
    this.router.navigate(['/details', serviceOrderCode]);
  }

  findByServiceOrderCode(serviceOrderCode: string) {
    this.usingSimpleSearch = true;
    this.simpleSearchValue = serviceOrderCode;
    this.resetPageAndList();
    this.findByServiceOrderCodeAndPage(serviceOrderCode, this.page);
  }

  findByFilters(advancedSearchParams: AdvancedSearchParams) {
    this.usingSimpleSearch = false;
    this.advancedSearchParams = advancedSearchParams;
    this.resetPageAndList();
    this.findByFiltersAndPage(advancedSearchParams, this.page);
  }

  private resetPageAndList() {
    this.page = 1;
    this.loading = true;
    this.submitted = true;
    this.hasMore = false;
    this.error = '';
    this.seviceOrderList = [];
  }

  private findByServiceOrderCodeAndPage(serviceOrderCode: string, page: number) {
    this.seviceOrderService.findByServiceOrderCode(serviceOrderCode, page).subscribe(
      (paginatedResponse) => this.handleResponse(paginatedResponse, page),
      (error) => this.handleError(error),
    );
  }

  private findByFiltersAndPage(advancedSearchParams: AdvancedSearchParams, page: number) {
    this.seviceOrderService.findByFilters(advancedSearchParams, page).subscribe(
      (paginatedResponse) => this.handleResponse(paginatedResponse, page),
      (error) => this.handleError(error),
    );
  }

  private handleResponse(paginatedResponse: PaginatedResponse<ServiceOrder>, page: number) {
    this.loading = false;
    if (paginatedResponse) {
      this.hasMore = true;
      if (page === 1) this.seviceOrderList = paginatedResponse.objects;
      else this.seviceOrderList.push(...paginatedResponse.objects);
    } else {
      this.hasMore = false;
    }
  }

  private handleError(error: Error) {
    console.log(error);
    this.error = `Erro ao buscar ordens de serviço`;
    this.loading = false;
  }

  loadMore() {
    this.loading = true;
    this.page++;
    if (this.usingSimpleSearch) {
      this.findByServiceOrderCodeAndPage(this.simpleSearchValue, this.page);
    } else {
      this.findByFiltersAndPage(this.advancedSearchParams, this.page);
    }
  }
}
