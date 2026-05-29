import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { TemaAprendizService } from '../services/tema-aprendiz.service';
import { AprendicesService } from '../../aprendices/services/aprendices.service';
import { TemasService } from '../../temas/services/temas.service';
import { TemaAprendiz } from '../models/tema-aprendiz.model';
import { Aprendiz } from '../../aprendices/models/aprendiz.model';
import { Tema } from '../../temas/models/tema.model';
import { compareLocale, matchesQuery } from '../../core/list-utils';

@Component({
  selector: 'app-tema-aprendiz-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './tema-aprendiz-list.component.html',
  styleUrls: ['./tema-aprendiz-list.component.scss'],
})
export class TemaAprendizListComponent implements OnInit {
  asignaciones: TemaAprendiz[] = [];
  aprendices: Aprendiz[] = [];
  temas: Tema[] = [];

  selectedAprendiz: number | null = null;
  selectedTema: number | null = null;
  searchQuery = '';

  loading = false;
  saving = false;
  error: string | null = null;
  successMsg: string | null = null;
  deleteConfirmId: number | null = null;

  constructor(
    private temaAprendizService: TemaAprendizService,
    private aprendicesService: AprendicesService,
    private temasService: TemasService,
  ) {}

  ngOnInit(): void {
    this.loadAll();
    this.aprendicesService.getAll().subscribe({
      next: (d) => {
        this.aprendices = [...d].sort((a, b) =>
          compareLocale(a.nombre_completo, b.nombre_completo),
        );
      },
    });
    this.temasService.getAll().subscribe({
      next: (d) => {
        this.temas = [...d].sort((a, b) =>
          compareLocale(a.nombre_tema, b.nombre_tema),
        );
      },
    });
  }

  get filteredAsignaciones(): TemaAprendiz[] {
    const q = this.searchQuery.trim().toLowerCase();
    if (!q) return this.asignaciones;
    return this.asignaciones.filter(
      (a) =>
        matchesQuery(a.nombre_completo, q) || matchesQuery(a.cedula, q),
    );
  }

  loadAll(): void {
    this.loading = true;
    this.error = null;
    this.temaAprendizService.getAll().subscribe({
      next: (d) => {
        this.asignaciones = [...d].sort((a, b) =>
          compareLocale(a.nombre_completo ?? '', b.nombre_completo ?? ''),
        );
        this.loading = false;
      },
      error: () => {
        this.error = 'Error al cargar las asignaciones.';
        this.loading = false;
      },
    });
  }

  asignar(): void {
    if (!this.selectedAprendiz || !this.selectedTema) return;
    this.saving = true;
    this.error = null;
    this.successMsg = null;
    this.temaAprendizService
      .create({ id_aprendiz: this.selectedAprendiz, id_tema: this.selectedTema })
      .subscribe({
        next: () => {
          this.saving = false;
          this.successMsg = 'Tema asignado correctamente.';
          this.selectedAprendiz = null;
          this.selectedTema = null;
          this.loadAll();
          setTimeout(() => (this.successMsg = null), 3000);
        },
        error: (err) => {
          this.saving = false;
          this.error = err.error?.message ?? 'Error al asignar el tema.';
        },
      });
  }

  confirmDelete(id: number): void {
    this.deleteConfirmId = id;
  }

  cancelDelete(): void {
    this.deleteConfirmId = null;
  }

  eliminarAsignacion(id: number): void {
    this.temaAprendizService.remove(id).subscribe({
      next: () => {
        this.asignaciones = this.asignaciones.filter((a) => a.id !== id);
        this.deleteConfirmId = null;
      },
      error: () => {
        this.error = 'Error al eliminar la asignación.';
      },
    });
  }
}
