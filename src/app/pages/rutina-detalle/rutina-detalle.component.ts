import { Component, inject } from '@angular/core';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { DataService } from '../../services/data.service';
import { ExerciseDialogComponent } from '../shared/exercise-dialog/exercise-dialog.component';

@Component({
  selector: 'app-rutina-detalle',
  standalone: true,
  imports: [AsyncPipe, NgFor, NgIf, MatDialogModule],
  templateUrl: './rutina-detalle.component.html',
  styleUrl: './rutina-detalle.component.scss'
})
export class RutinaDetalleComponent {
  data = inject(DataService);
  private route = inject(ActivatedRoute);
  private dialog = inject(MatDialog);

  get routineId(): string | null {
    return this.route.snapshot.paramMap.get('id');
  }

  findRoutine(routines: any[], id: string) {
    return routines.find(r => r.id === id);
  }

  exerciseName(exId: string, exercises: any[]) {
    return exercises.find(e => e.id === exId)?.name ?? exId;
  }

  exerciseThumb(exId: string, exercises: any[]) {
    return exercises.find(e => e.id === exId)?.thumbnail ?? '';
  }

  openExercise(exerciseId: string, sets: number, reps: number, weightKg: number | undefined, exercises: any[]) {
    const ex = exercises.find(e => e.id === exerciseId);
    if (!ex) return;

    this.dialog.open(ExerciseDialogComponent, {
      data: { name: ex.name, image: ex.image, sets, reps, weightKg }
    });
  }
}