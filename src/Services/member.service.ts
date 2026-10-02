
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Member } from 'src/Modèles/Member';
@Injectable({
  providedIn: 'root'
})
export class MemberService {

  private apiUrl = 'http://localhost:9000/MEMBRE-SERVICE/membres';

  constructor(private http: HttpClient) {}

  GetAllMembers(): Observable<Member[]> {
    return this.http.get<Member[]>(this.apiUrl);
  }

  getMemberById(id: number): Observable<Member> {
    return this.http.get<Member>(`${this.apiUrl}/${id}`);
  }

  deleteMemberById(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  addMember(m: Member): Observable<Member> {
    const url = this.isStudent(m)
      ? `${this.apiUrl}/etudiant`
      : `${this.apiUrl}/enseignant`;
    return this.http.post<Member>(url, m);
  }

  updateMember(id: number, m: Member): Observable<Member> {
    const url = this.isStudent(m)
      ? `${this.apiUrl}/etudiant/${id}`
      : `${this.apiUrl}/enseignant/${id}`;
    return this.http.put<Member>(url, m);
  }

  private isStudent(m: any): boolean {
    return !!(m.dateInscription || m.diplome);
  }
}
