import { Component } from '@angular/core';
<<<<<<< HEAD
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
=======
import { RouterOutlet } from '@angular/router';
>>>>>>> 976261574fddc967e2e02e05af7784e6b240291f

@Component({
  selector: 'app-root',
  standalone: true,
<<<<<<< HEAD
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  template: `
    <nav class="navbar">
      <div class="nav-content">
        <span class="nav-brand">Sistema ADSO 19</span>
        <div class="nav-links">
          <a routerLink="/temas"       routerLinkActive="active">Temas</a>
          <a routerLink="/aprendices"  routerLinkActive="active">Aprendices</a>
          <a routerLink="/asignaciones" routerLinkActive="active">Asignaciones</a>
        </div>
      </div>
    </nav>
    <router-outlet />
  `,
  styles: [`
    .navbar {
      position: sticky; top: 0; z-index: 100;
      background: rgba(13, 15, 26, 0.85);
      backdrop-filter: blur(16px) saturate(1.12);
      -webkit-backdrop-filter: blur(16px) saturate(1.12);
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    }
    .nav-content {
      max-width: 1200px; margin: 0 auto;
      padding: 0 3rem;
      display: flex; align-items: center; justify-content: space-between;
      height: 52px;
    }
    .nav-brand {
      font-size: 1.25rem; font-weight: 900; letter-spacing: -.02em;
      background: linear-gradient(135deg,#fff 30%,rgba(124,158,248,.9) 100%);
      -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
    }
    .nav-links {
      display: flex; gap: .25rem;
    }
    .nav-links a {
      padding: .4rem .85rem; border-radius: 8px;
      font-size: 1.1rem; font-weight: 500;
      color: rgba(255,255,255,0.5);
      text-decoration: none;
      border: 1px solid transparent;
      transition: all .18s;
    }
    .nav-links a:hover {
      color: rgba(255,255,255,0.85);
      background: rgba(255,255,255,0.06);
    }
    .nav-links a.active {
      color: rgba(200,215,255,0.95);
      background: rgba(124,158,248,0.12);
      border-color: rgba(124,158,248,0.3);
    }
    @media (max-width: 480px) {
      .nav-links a { padding: .35rem .6rem; font-size: .78rem; }
    }
  `]
=======
  imports: [RouterOutlet],
  template: `<router-outlet />`,
>>>>>>> 976261574fddc967e2e02e05af7784e6b240291f
})
export class AppComponent {}