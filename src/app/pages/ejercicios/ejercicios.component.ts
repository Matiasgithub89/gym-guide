import { Component, inject } from '@angular/core';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { combineLatest, map } from 'rxjs';
import { DataService, BaseExercise } from '../../services/data.service';
import { UserDataService } from '../../services/user-data.service';

import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatChipsModule } from '@angular/material/chips';

import { ExerciseFormDialogComponent } from '../shared/exercise-form-dialog/exercise-form-dialog.component';

@Component({
  selector: 'app-ejercicios',
  standalone: true,
  imports: [
    AsyncPipe, NgFor, NgIf,
    MatListModule, MatButtonModule, MatDialogModule, MatChipsModule
  ],
  templateUrl: './ejercicios.component.html',
  styleUrl: './ejercicios.component.scss'
})
export class EjerciciosComponent {
  private data = inject(DataService);
  private userData = inject(UserDataService);
  private dialog = inject(MatDialog);

  readonly exercises$ = combineLatest([this.data.base$, this.userData.state$]).pipe(
    map(([base, user]) => {
      const byId = new Map<string, BaseExercise>();

      // base primero
      for (const ex of base.exercises) byId.set(ex.id, ex);

      // user override / suma
      for (const ex of user.userExercises) byId.set(ex.id, ex);

      // orden alfabético por nombre
      return Array.from(byId.values()).sort((a, b) => a.name.localeCompare(b.name));
    })
  );

  openAddDialog() {
    const ref = this.dialog.open(ExerciseFormDialogComponent, { width: '520px' });

    ref.afterClosed().subscribe((result: BaseExercise | null | undefined) => {
      if (!result) return;
      this.userData.addExercise(result);
    });
  }

  trackById(_: number, ex: BaseExercise) {
    return ex.id;
  }

  placeholderThumb(ex: BaseExercise) {
    // si no hay thumbnail, usamos la imagen grande; si tampoco, un placeholder
    return ex.thumbnail || ex.image || 'assets/exercises/thumbs/placeholder.png';
  }
}