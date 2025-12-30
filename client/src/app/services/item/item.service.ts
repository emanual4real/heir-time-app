import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Item } from '@types';

@Injectable({
  providedIn: 'root',
})
export class ItemService {
  private baseApiUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) {}

  getItemById(itemId: string, projectId: string) {
    const queryParams = new HttpParams();
    queryParams.set('projectId', projectId);
    return this.http.get<Item>(`${this.baseApiUrl}/item/${itemId}`, {
      params: queryParams,
    });
  }

  // TODO: might not be needed
  getItemsByProject(projectId: string) {
    const queryParams = new HttpParams();
    queryParams.set('projectId', projectId);
    return this.http.get<Item[]>(`${this.baseApiUrl}/item`, {
      params: queryParams,
    });
  }

  createItem(payload: Item) {
    const body = { ...payload };
    return this.http.post<Item>(`${this.baseApiUrl}/item`, body);
  }

  deleteItem(itemId: string, projectId: string) {
    const queryParams = new HttpParams();
    queryParams.set('projectId', projectId);
    return this.http.delete<Item>(`${this.baseApiUrl}/item/${itemId}`, {
      params: queryParams,
    });
  }
}
