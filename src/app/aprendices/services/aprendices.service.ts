import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Aprendiz, CreateAprendizDto, UpdateAprendizDto } from '../models/aprendiz.model';

@Injectable({ providedIn: 'root' })
export class AprendicesService {
  private readonly apiUrl = `${environment.apiUrl}/aprendices`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<Aprendiz[]> {
    return this.http.get<Aprendiz[]>(this.apiUrl);
  }

  getOne(id: number): Observable<Aprendiz> {
    return this.http.get<Aprendiz>(`${this.apiUrl}/${id}`);
  }

  create(dto: CreateAprendizDto): Observable<Aprendiz> {
    return this.http.post<Aprendiz>(this.apiUrl, dto);
  }

  update(id: number, dto: UpdateAprendizDto): Observable<Aprendiz> {
    return this.http.patch<Aprendiz>(`${this.apiUrl}/${id}`, dto);
  }

  remove(id: number): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${this.apiUrl}/${id}`);
  }
}
