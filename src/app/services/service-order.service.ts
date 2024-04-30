import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ServiceOrder } from '../model/service-order';
import { PaginatedResponse } from '../model/paginated-response';
import { AdvancedSearchParams } from '../model/advanced-search-params';
import { ServiceOrderHistory } from '../model/history';
import { Procedure } from '../model/procedure';

@Injectable({
  providedIn: 'root',
})
export class ServiceOrderService {
  private API = '/api/serviceorders';

  constructor(private http: HttpClient) {}

  findByServiceOrderCode(serviceOrderCode: string, page: number): Observable<PaginatedResponse<ServiceOrder>> {
    if (!serviceOrderCode) throw new Error('serviceOrderCode is required');

    const params = new HttpParams().set('serviceOrderCode', serviceOrderCode).set('page', page.toString());

    return this.http.get<PaginatedResponse<ServiceOrder>>(this.API, { params });
  }

  findByFilters(advancedSearchParams: AdvancedSearchParams, page: number): Observable<PaginatedResponse<ServiceOrder>> {
    if (!advancedSearchParams) throw new Error('advancedSearchParams is required');

    let params = new HttpParams();

    Object.keys(advancedSearchParams).forEach((key) => {
      if (advancedSearchParams[key]) {
        if (advancedSearchParams[key] instanceof Date) {
          params = params.set(key, this.formatDate(advancedSearchParams[key] as Date));
        } else if (Array.isArray(advancedSearchParams[key])) {
          (advancedSearchParams[key] as string[]).forEach((value) => {
            params = params.append(key, value);
          });
        } else {
          params = params.set(key, advancedSearchParams[key] as string);
        }
      }
    });

    params = params.set('pagenumber', page.toString()).set('pagesize', '10');

    return this.http.get<PaginatedResponse<ServiceOrder>>(this.API, { params });
  }

  findHistoryByServiceOrderCode(serviceOrderCode: string): Observable<PaginatedResponse<ServiceOrderHistory>> {
    if (!serviceOrderCode) throw new Error('serviceOrderCode is required');

    return this.http.get<PaginatedResponse<ServiceOrderHistory>>(`${this.API}/${serviceOrderCode}/history`);
  }

  findProcedureByServiceOrderCode(serviceOrderCode: string): Observable<PaginatedResponse<Procedure>> {
    if (!serviceOrderCode) throw new Error('serviceOrderCode is required');

    return this.http.get<PaginatedResponse<Procedure>>(`${this.API}/${serviceOrderCode}/procedures`);
  }

  private formatDate(date: Date): string {
    return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()} 00:00`;
  }
}
