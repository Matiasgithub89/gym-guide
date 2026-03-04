import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { BaseExercise } from '../../../services/data.service';

function slugify(input: string): string {
  return input
    .trim()
    .toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

@Component({
  selector: 'app-exercise-form-dialog',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './exercise-form-dialog.component.html',
  styleUrls: ['./exercise-form-dialog.component.scss']
})
export class ExerciseFormDialogComponent {
  private fb = inject(FormBuilder);
  private dialogRef = inject(MatDialogRef<ExerciseFormDialogComponent>);

  form = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    id: [''],
    muscles: [''],
    thumbnail: [''],
    image: ['']
  });

  constructor() {
    this.form.get('name')!.valueChanges.subscribe(name => {
      const currentId = this.form.get('id')!.value;
      if (!currentId) {
        this.form.get('id')!.setValue(slugify(name ?? ''), { emitEvent: false });
      }
    });
  }

  cancel() {
    this.dialogRef.close(null);
  }

  save() {
    if (this.form.invalid) return;

    const name = this.form.value.name!.trim();
    const id = (this.form.value.id || slugify(name)).trim();

    const muscles = (this.form.value.muscles || '')
      .split(',')
      .map(s => s.trim())
      .filter(Boolean);

    const ex: BaseExercise = {
      id,
      name,
      muscles: muscles.length ? muscles : undefined,
      thumbnail: this.form.value.thumbnail?.trim() || undefined,
      image: this.form.value.image?.trim() || undefined
    };

    this.dialogRef.close(ex);
  }
}
