import { Component, computed, inject } from '@angular/core';
import { Router, RouterOutlet, NavigationEnd } from '@angular/router';
import { MatTabsModule } from '@angular/material/tabs';
import { filter, map, startWith } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MatTabsModule],
  template: `
    <mat-tab-group
      [selectedIndex]="selectedIndex()"
      (selectedIndexChange)="onTabChange($event)"
    >
      <mat-tab label="Rutinas"></mat-tab>
      <mat-tab label="Ejercicios"></mat-tab>
    </mat-tab-group>

    <router-outlet></router-outlet>
  `
})
export class AppComponent {
  private router = inject(Router);

  private url$ = this.router.events.pipe(
    filter((e): e is NavigationEnd => e instanceof NavigationEnd),
    map(e => e.urlAfterRedirects),
    startWith(this.router.url)
  );

  selectedIndex = computed(() => {
    const url = (this.router.url || '').toLowerCase();
    return url.startsWith('/ejercicios') ? 1 : 0;
  });

  onTabChange(index: number) {
    this.router.navigateByUrl(index === 0 ? '/rutinas' : '/ejercicios');
  }
}