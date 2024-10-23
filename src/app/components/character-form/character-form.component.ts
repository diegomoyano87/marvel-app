import { Component, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-character-form',
  template: `
    <h2>Agregar Nuevo Personaje</h2>
    <label>
       <h4>Nombre del Personaje:</h4>
      <input [(ngModel)]="newCharacter.name" placeholder="Nombre Personaje" id="characterName" name="characterName">
    </label>
    <button (click)="add()">Agregar</button>
  `,
  standalone: true,
  imports: [FormsModule]
})
export class CharacterFormComponent {
  @Output() addCharacter = new EventEmitter<any>();

  newCharacter = { id: 0, name: '' };

  add() {
    this.newCharacter.id = Date.now();
    this.addCharacter.emit(this.newCharacter);
    this.newCharacter = { id: 0, name: '' };
  }
}
