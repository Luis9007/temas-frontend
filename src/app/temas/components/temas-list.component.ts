import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TemasService } from '../services/temas.service';
import { Tema } from '../models/tema.model';

@Component({
  selector: 'app-temas-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './temas-list.component.html',
  styleUrls: ['./temas-list.component.scss'],
})
export class TemasListComponent implements OnInit {
  temas: Tema[] = [];
  filteredTemas: Tema[] = [];
  searchTerm: string = '';
  loading = false;
  error: string | null = null;
  deleteConfirmId: number | null = null;

  constructor(private temasService: TemasService) {}

  ngOnInit(): void {
    this.loadTemas();
  }

  private sortTemasByName(temas: Tema[]): Tema[] {
    return [...temas].sort((a, b) =>
      a.nombre_tema.localeCompare(b.nombre_tema, 'es', { sensitivity: 'base' })
    );
  }

  loadTemas(): void {
    this.loading = true;
    this.error = null;
    this.temasService.getAll().subscribe({
      next: (data) => {
        this.temas = this.sortTemasByName(data);
        this.filterTemas();
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Error al cargar los temas.';
        this.loading = false;
        console.error(err);
      },
    });
  }

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

  confirmDelete(id: number): void {
    this.deleteConfirmId = id;
  }

  cancelDelete(): void {
    this.deleteConfirmId = null;
  }

  deleteTema(id: number): void {
    this.temasService.remove(id).subscribe({
      next: () => {
        this.temas = this.sortTemasByName(
          this.temas.filter((t) => t.id !== id)
        );
        this.filterTemas();
        this.deleteConfirmId = null;
      },
      error: (err) => {
        this.error = 'Error al eliminar el tema.';
        console.error(err);
      },
    });
  }
}
