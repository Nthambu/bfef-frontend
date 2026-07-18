import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from '../../../environments/environment';
import {
  ApiResponse,
  ContactFormPayload,
  Member,
  Page,
} from '../models/api.models';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private base = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getPage(slug: string): Observable<Page> {
    return this.http
      .get<ApiResponse<Page>>(`${this.base}api/v1/public/pages/${slug}`)
      .pipe(map((r) => r.data));
  }

  getAllPages(): Observable<Page[]> {
    return this.http
      .get<ApiResponse<Page[]>>(`${this.base}api/v1/public/pages`)
      .pipe(map((r) => r.data));
  }

  getLeadership(): Observable<Member[]> {
    return this.http
      .get<ApiResponse<Member[]>>(`${this.base}api/v1/public/leadership`)
      .pipe(map((r) => r.data));
  }

  submitContact(payload: ContactFormPayload): Observable<unknown> {
    return this.http
      .post<ApiResponse<unknown>>(`${this.base}api/v1/public/contact`, payload)
      .pipe(map((r) => r.data));
  }
}
