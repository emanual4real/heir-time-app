import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Item } from '@types';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ItemService {
  private baseApiUrl = 'http://localhost:8080/api';

  private _items = new BehaviorSubject<Item[]>([]);

  readonly items = this._items.asObservable();

  constructor(private http: HttpClient) {}

  getItemById(itemId: string, projectId: string) {
    const queryParams = new HttpParams();
    queryParams.set('projectId', projectId);
    return this.http.get<Item>(`${this.baseApiUrl}/item/${itemId}`, {
      params: queryParams,
    });
  }

  getItemsByProject(projectId: string) {
    const queryParams = new HttpParams();
    queryParams.set('projectId', projectId);
    this.http
      .get<Item[]>(`${this.baseApiUrl}/item`, {
        params: queryParams,
      })
      .subscribe((data) => {
        this._items.next(data);
      });
  }

  createItem(payload: Item) {
    const body = { ...payload };
    this.http.post<Item>(`${this.baseApiUrl}/item`, body).subscribe((data) => {
      this._items.next(this._items.value.concat(data));
    });
  }

  deleteItem(itemId: string, projectId: string) {
    const queryParams = new HttpParams();
    queryParams.set('projectId', projectId);
    this.http
      .delete<Item>(`${this.baseApiUrl}/item/${itemId}`, {
        params: queryParams,
      })
      .subscribe((data) => {
        this._items.next(this._items.value.filter((row) => row.id !== data.id));
      });
  }
}
