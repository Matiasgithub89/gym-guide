import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, shareReplay } from 'rxjs';

export interface BaseExercise {
  id: string;
  name: string;
  thumbnail?: string;
  image?: string;
  muscles?: string[];
}

export interface RoutineItem {
  exerciseId: string;
  sets: number;
  reps: number;
  weightKg?: number;
}

export interface BaseRoutine {
  id: string;
  name: string;
  items: RoutineItem[];
}

export interface BaseData {
  version: number;
  exercises: BaseExercise[];
  routines: BaseRoutine[];
}

@Injectable({ providedIn: 'root' })
export class DataService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = 'assets/data/base.json';

  readonly base$: Observable<BaseData> = this.http
    .get<BaseData>(this.baseUrl)
    .pipe(shareReplay(1));
}