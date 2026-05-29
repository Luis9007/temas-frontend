import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TemasService } from '../services/temas.service';
import { Tema } from '../models/tema.model';
import { compareLocale, matchesQuery } from '../../core/list-utils';

@Component({
  selector: 'app-temas-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './temas-list.component.html',
  styleUrls: ['./temas-list.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class TemasListComponent implements OnInit {
  temas: Tema[] = [];
  searchQuery = '';
  loading = false;
  error: string | null = null;
  deleteConfirmId: number | null = null;

  constructor(private temasService: TemasService) {}

  ngOnInit(): void {
    this.loadTemas();
  }

  get filteredTemas(): Tema[] {
    const q = this.searchQuery.trim().toLowerCase();
    if (!q) return this.temas;
    return this.temas.filter((t) => matchesQuery(t.nombre_tema, q));
  }

  loadTemas(): void {
    this.loading = true;
    this.error = null;
    this.temasService.getAll().subscribe({
      next: (data) => {
        this.temas = [...data].sort((a, b) =>
          compareLocale(a.nombre_tema, b.nombre_tema),
        );
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Error al cargar los temas.';
        this.loading = false;
        console.error(err);
      },
    });
  }

  confirmDelete(id: number): void {
    this.deleteConfirmId = id;
  }

  cancelDelete(): void {
    this.deleteConfirmId = null;
  }

  deleteTema(id: number): void {
    this.temasService.remove(id).subscribe({
      next: () => {
        this.temas = this.temas.filter((t) => t.id !== id);
        this.deleteConfirmId = null;
      },
      error: (err) => {
        this.error = 'Error al eliminar el tema.';
        console.error(err);
      },
    });
  }
}
