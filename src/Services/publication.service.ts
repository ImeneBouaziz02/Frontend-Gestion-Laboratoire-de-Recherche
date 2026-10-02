
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Pub } from 'src/Modèles/Pub';

@Injectable({
  providedIn: 'root'
})
export class PublicationService {
  private apiUrl = 'http://localhost:9000/PUBLICATION-SERVICE/publications';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Pub[]> {
    return this.http.get<Pub[]>(this.apiUrl);
  }

  getById(id: number): Observable<Pub> {
    return this.http.get<Pub>(`${this.apiUrl}/${id}`);
  }

  add(pub: Pub): Observable<Pub> {
    return this.http.post<Pub>(this.apiUrl, pub);
  }

  update(id: number, pub: Pub): Observable<Pub> {
    return this.http.put<Pub>(`${this.apiUrl}/${id}`, pub);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  getByType(type: string): Observable<Pub[]> {
    return this.http.get<Pub[]>(`${this.apiUrl}/type/${type}`);
  }

  getByMembre(membreId: number): Observable<Pub[]> {
    return this.http.get<Pub[]>(`${this.apiUrl}/membre/${membreId}`);
  }
}