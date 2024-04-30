import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PaginatedResponse } from '../model/paginated-response';
import { Cluster } from '../model/cluster';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ClusterService {
  private API = '/api/clusters';

  constructor(private http: HttpClient) {}

  findAll(): Observable<PaginatedResponse<Cluster>> {
    return this.http.get<PaginatedResponse<Cluster>>(this.API);
  }
}
