import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-character-list',
  template: `
    <ul>
      <li *ngFor="let character of characters" (click)="select(character)">
        {{ character.name }}
        <button (click)="delete(character.id, $event)"> Borrar Personaje</button>
      </li>
    </ul>
  `,
  standalone: true,
  imports: [NgFor]
})
export class CharacterListComponent {
  @Input() characters: any[] = [];
  @Output() selectCharacter = new EventEmitter<any>();
  @Output() deleteCharacter = new EventEmitter<number>();

  select(character: any) {
    this.selectCharacter.emit(character);
  }

  delete(characterId: number, event: Event) {
    event.stopPropagation();
    this.deleteCharacter.emit(characterId);
  }
}
