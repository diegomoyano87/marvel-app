import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common'; 

@Component({
  selector: 'app-character-details',
  template: `
    <div *ngIf="character">
      <h2>{{ character.name }} Detalles</h2>
      <label>
        Nombre:
        <input [(ngModel)]="character.name" placeholder="Nombre del Personaje">
      </label>
      <button (click)="update()">Guardar</button>
    </div>
  `,
  standalone: true,
  imports: [FormsModule, NgIf] 
})
export class CharacterDetailsComponent implements OnChanges {
  @Input() character: any;
  @Output() updateCharacter = new EventEmitter<any>();

  ngOnChanges() {}

  update() {
    this.updateCharacter.emit(this.character);
  }
}
