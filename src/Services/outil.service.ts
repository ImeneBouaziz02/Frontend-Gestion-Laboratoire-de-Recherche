import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Outil } from 'src/Modèles/Outil';

@Injectable({
  providedIn: 'root'
})
export class OutilService {
  private apiUrl = 'http://localhost:9000/OUTIL-SERVICE/outils';

  constructor(private http: HttpClient) { }

  getAll(): Observable<Outil[]> {
    return this.http.get<Outil[]>(this.apiUrl);
  }

  getById(id: number): Observable<Outil> {
    return this.http.get<Outil>(`${this.apiUrl}/${id}`);
  }

  add(outil: Outil): Observable<Outil> {
    return this.http.post<Outil>(this.apiUrl, outil);
  }

  update(id: number, outil: Outil): Observable<Outil> {
    return this.http.put<Outil>(`${this.apiUrl}/${id}`, outil);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  addMembreToOutil(outilId: number, membreId: number): Observable<Outil> {
    return this.http.put<Outil>(`${this.apiUrl}/${outilId}/membres/${membreId}`, {});
  }
}