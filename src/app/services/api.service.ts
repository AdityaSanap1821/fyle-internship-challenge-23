import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap, throwError } from 'rxjs';
import { ProfileData } from '../components/search/search.component';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private httpClient: HttpClient) { }

  /**
   * @description Get API call for Github user
   * @param githubUsername
   * @returns Observable
   */
  getUser(githubUsername: string) {
    return this.httpClient.get<ProfileData>(
      `https://api.github.com/users/${githubUsername}`
    );
  }

  /**
   * @description Get API call for custom API path
   */
  getData(apiPath: string) {
    return this.httpClient.get(apiPath);
  }
}