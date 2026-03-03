import { Component, inject } from '@angular/core';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { RouterLink } from '@angular/router';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-rutinas',
  standalone: true,
  imports: [AsyncPipe, NgFor, NgIf, MatListModule, RouterLink],
  templateUrl: './rutinas.component.html',
  styleUrl: './rutinas.component.scss'
})
export class RutinasComponent {
  data = inject(DataService);
}