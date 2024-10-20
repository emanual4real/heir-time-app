import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NewProjectPayload, Project } from '@types';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  private baseApiUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) {}

  getUserProject() {
    return this.http.get<Project[]>(`${this.baseApiUrl}/project`);
  }

  getProjectByProjectId(projectId: string) {
    const queryParams = new HttpParams();
    queryParams.set('projectId', projectId);
    return this.http.get<Project[]>(`${this.baseApiUrl}/project`, {
      params: queryParams,
    });
  }

  deleteProject(projectId: string) {
    return this.http.delete<string>(`${this.baseApiUrl}/project/${projectId}`);
  }

  createProject(project: NewProjectPayload) {
    const body = { ...project };
    return this.http.post<Project>(`${this.baseApiUrl}/project`, body);
  }
}
