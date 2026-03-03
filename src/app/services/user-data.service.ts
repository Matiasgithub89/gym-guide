import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { BaseExercise } from './data.service';

type UserDataState = {
  version: 1;
  userExercises: BaseExercise[];
};

const LS_KEY = 'gym-guide.userData.v1';

function loadState(): UserDataState {
  try {
    const raw = localStorage.getItem(LS_KEY);
    if (!raw) return { version: 1, userExercises: [] };
    const parsed = JSON.parse(raw);
    if (!parsed || parsed.version !== 1 || !Array.isArray(parsed.userExercises)) {
      return { version: 1, userExercises: [] };
    }
    return parsed;
  } catch {
    return { version: 1, userExercises: [] };
  }
}

function saveState(state: UserDataState) {
  localStorage.setItem(LS_KEY, JSON.stringify(state));
}

@Injectable({ providedIn: 'root' })
export class UserDataService {
  private stateSubject = new BehaviorSubject<UserDataState>(loadState());
  state$ = this.stateSubject.asObservable();

  get snapshot(): UserDataState {
    return this.stateSubject.value;
  }

  addExercise(ex: BaseExercise) {
    const state = this.snapshot;

    // Evitar colisiones de ID: si ya existe en user, no lo agregamos
    if (state.userExercises.some(e => e.id === ex.id)) return;

    const next: UserDataState = {
      ...state,
      userExercises: [ex, ...state.userExercises]
    };

    saveState(next);
    this.stateSubject.next(next);
  }
}