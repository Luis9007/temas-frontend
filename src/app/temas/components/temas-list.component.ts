<<<<<<< HEAD
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TemasService } from '../services/temas.service';
import { Tema } from '../models/tema.model';
import { compareLocale, matchesQuery } from '../../core/list-utils';
=======
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TemasService } from '../services/temas.service';
import { Tema } from '../models/tema.model';
>>>>>>> 976261574fddc967e2e02e05af7784e6b240291f

@Component({
  selector: 'app-temas-list',
  standalone: true,
<<<<<<< HEAD
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './temas-list.component.html',
  styleUrls: ['./temas-list.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class TemasListComponent implements OnInit {
  temas: Tema[] = [];
  searchQuery = '';
=======
  imports: [CommonModule, RouterModule],
  templateUrl: './temas-list.component.html',
  styleUrls: ['./temas-list.component.scss'],
})
export class TemasListComponent implements OnInit {
  temas: Tema[] = [];
  filteredTemas: Tema[] = [];
  searchTerm: string = '';
>>>>>>> 976261574fddc967e2e02e05af7784e6b240291f
  loading = false;
  error: string | null = null;
  deleteConfirmId: number | null = null;

  constructor(private temasService: TemasService) {}

  ngOnInit(): void {
    this.loadTemas();
  }

<<<<<<< HEAD
  get filteredTemas(): Tema[] {
    const q = this.searchQuery.trim().toLowerCase();
    if (!q) return this.temas;
    return this.temas.filter((t) => matchesQuery(t.nombre_tema, q));
=======
  private sortTemasByName(temas: Tema[]): Tema[] {
    return [...temas].sort((a, b) =>
      a.nombre_tema.localeCompare(b.nombre_tema, 'es', { sensitivity: 'base' })
    );
>>>>>>> 976261574fddc967e2e02e05af7784e6b240291f
  }

  loadTemas(): void {
    this.loading = true;
    this.error = null;
    this.temasService.getAll().subscribe({
      next: (data) => {
<<<<<<< HEAD
        this.temas = [...data].sort((a, b) =>
          compareLocale(a.nombre_tema, b.nombre_tema),
        );
=======
        this.temas = this.sortTemasByName(data);
        this.filterTemas();
>>>>>>> 976261574fddc967e2e02e05af7784e6b240291f
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Error al cargar los temas.';
        this.loading = false;
        console.error(err);
      },
    });
  }

<<<<<<< HEAD
=======
  filterTemas(): void {
    if (!this.searchTerm.trim()) {
      this.filteredTemas = [...this.temas];
    } else {
      const term = this.searchTerm.toLowerCase();
      this.filteredTemas = this.temas.filter((tema) =>
        tema.nombre_tema.toLowerCase().includes(term)
      );
    }
  }

  onSearchChange(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.searchTerm = value;
    this.filterTemas();
  }

>>>>>>> 976261574fddc967e2e02e05af7784e6b240291f
  confirmDelete(id: number): void {
    this.deleteConfirmId = id;
  }

  cancelDelete(): void {
    this.deleteConfirmId = null;
  }

  deleteTema(id: number): void {
    this.temasService.remove(id).subscribe({
      next: () => {
<<<<<<< HEAD
        this.temas = this.temas.filter((t) => t.id !== id);
=======
        this.temas = this.sortTemasByName(
          this.temas.filter((t) => t.id !== id)
        );
        this.filterTemas();
>>>>>>> 976261574fddc967e2e02e05af7784e6b240291f
        this.deleteConfirmId = null;
      },
      error: (err) => {
        this.error = 'Error al eliminar el tema.';
        console.error(err);
      },
    });
  }
}
