import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ServiceOrder } from '../model/service-order';
import { PaginatedResponse } from '../model/paginated-response';

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
}
