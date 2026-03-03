import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { NgIf } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-exercise-dialog',
  standalone: true,
  imports: [MatDialogModule, NgIf, MatButtonModule],
  template: `
    <h2 mat-dialog-title>{{ data.name }}</h2>

    <div mat-dialog-content>
      <p style="margin-top:0;">
        {{ data.sets }}x{{ data.reps }} · {{ data.weightKg ?? '-' }} kg
      </p>

      <img
        [src]="data.image"
        alt=""
        style="width:100%; max-width:520px; display:block; margin:0 auto; border-radius:12px;"
      />
    </div>

    <div mat-dialog-actions align="end">
      <button mat-button mat-dialog-close>Cerrar</button>
    </div>
  `
})
export class ExerciseDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: {
    name: string;
    image: string;
    sets: number;
    reps: number;
    weightKg?: number;
  }) {}
}