import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AprendicesService } from '../services/aprendices.service';
import { Aprendiz } from '../models/aprendiz.model';
import { compareLocale, matchesQuery } from '../../core/list-utils';

@Component({
  selector: 'app-aprendices-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './aprendices-list.component.html',
  styleUrls: ['./aprendices-list.component.scss'],
})
export class AprendicesListComponent implements OnInit {
  aprendices: Aprendiz[] = [];
  searchQuery = '';
  loading = false;
  error: string | null = null;
  deleteConfirmId: number | null = null;

  constructor(private aprendicesService: AprendicesService) {}

  ngOnInit(): void {
    this.loadAprendices();
  }

  get filteredAprendices(): Aprendiz[] {
    const q = this.searchQuery.trim().toLowerCase();
    if (!q) return this.aprendices;
    return this.aprendices.filter(
      (a) =>
        matchesQuery(a.nombre_completo, q) || matchesQuery(a.cedula, q),
    );
  }

  loadAprendices(): void {
    this.loading = true;
    this.error = null;
    this.aprendicesService.getAll().subscribe({
      next: (data) => {
        this.aprendices = [...data].sort((a, b) =>
          compareLocale(a.nombre_completo, b.nombre_completo),
        );
        this.loading = false;
      },
      error: () => {
        this.error = 'Error al cargar los aprendices.';
        this.loading = false;
      },
    });
  }

  confirmDelete(id: number): void {
    this.deleteConfirmId = id;
  }

  cancelDelete(): void {
    this.deleteConfirmId = null;
  }

  deleteAprendiz(id: number): void {
    this.aprendicesService.remove(id).subscribe({
      next: () => {
        this.aprendices = this.aprendices.filter((a) => a.id !== id);
        this.deleteConfirmId = null;
      },
      error: () => {
        this.error = 'Error al eliminar el aprendiz.';
      },
    });
  }

  formatFecha(fecha: string): string {
    if (!fecha) return '';
    const d = new Date(fecha);
    return d.toLocaleDateString('es-CO', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  }
}
