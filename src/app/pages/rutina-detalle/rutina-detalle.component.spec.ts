import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RutinaDetalleComponent } from './rutina-detalle.component';

describe('RutinaDetalleComponent', () => {
  let component: RutinaDetalleComponent;
  let fixture: ComponentFixture<RutinaDetalleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RutinaDetalleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RutinaDetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
