
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Evt } from 'src/Modèles/Evt';

@Injectable({
  providedIn: 'root'
})
export class EvenementService {
  private apiUrl = 'http://localhost:9000/EVENEMENT-SERVICE/evenements';

  constructor(private httpClient: HttpClient) { }

  GetAllEvts(): Observable<Evt[]> {
    return this.httpClient.get<Evt[]>(this.apiUrl);
  }

  addEvent(evt: Evt): Observable<Evt> {
    return this.httpClient.post<Evt>(this.apiUrl, evt);
  }

  getEventById(id: number): Observable<Evt> {
    return this.httpClient.get<Evt>(`${this.apiUrl}/${id}`);
  }

  updateEvent(id: number, evt: Evt): Observable<Evt> {
    return this.httpClient.put<Evt>(`${this.apiUrl}/${id}`, evt);
  }

  deleteEvent(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.apiUrl}/${id}`);
  }

  addMembreToEvent(eventId: number, membreId: number): Observable<Evt> {
    return this.httpClient.put<Evt>(`${this.apiUrl}/${eventId}/membres/${membreId}`, {});
  }

  removeMembreFromEvent(eventId: number, membreId: number): Observable<Evt> {
    return this.httpClient.delete<Evt>(`${this.apiUrl}/${eventId}/membres/${membreId}`);
  }
}