import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HackerNewsService {
  private API_BASE_URL = 'https://hn.algolia.com/api/v1';
  constructor(private http: HttpClient) { }
  search(searchTerm: string): Observable<[]> {
    return this.http
      .get<[]>(
      `${this.API_BASE_URL}/search?query=${searchTerm}`
      )
      .pipe(map((result:any) => result.hits));
  }
}