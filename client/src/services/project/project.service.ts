import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NewProjectPayload, Project } from '@types';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  private baseApiUrl = 'http://localhost:8080/api';
  private _projects = new BehaviorSubject<Project[]>([]);

  readonly projects = this._projects.asObservable();

  constructor(private http: HttpClient) {}

  getUserProject() {
    this.http.get<Project[]>(`${this.baseApiUrl}/project`).subscribe((data) => {
      this._projects.next(data);
    });
  }

  getProjectByProjectId(projectId: string) {
    const queryParams = new HttpParams();
    queryParams.set('projectId', projectId);
    this.http
      .get<Project[]>(`${this.baseApiUrl}/project`, { params: queryParams })
      .subscribe((data) => {
        this._projects.next(data);
      });
  }

  deleteProject(projectId: string) {
    const queryParams = new HttpParams();
    queryParams.set('projectId', projectId);
    this.http
      .delete<Project>(`${this.baseApiUrl}/project`, { params: queryParams })
      .subscribe((data) => {
        this._projects.next(
          this._projects.value.filter((row) => row.id !== data.id),
        );
      });
  }

  createProject(payload: NewProjectPayload) {
    const body = { ...payload };
    this.http
      .post<Project>(`${this.baseApiUrl}/project`, body)
      .subscribe((data) => {
        this._projects.next(this._projects.value.concat(data));
      });
  }
}
