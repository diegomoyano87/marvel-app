import { Component, OnInit } from '@angular/core';
import { MarvelApiService } from './services/marvel-api.service';
import { CharacterListComponent } from './components/character-list/character-list.component';
import { CharacterDetailsComponent } from './components/character-details/character-details.component';
import { CharacterFormComponent } from './components/character-form/character-form.component';
import { NgFor, NgIf } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';  

@Component({
  selector: 'app-root',
  template: `
    <h1>Personajes de Marvel</h1>
    <app-character-list 
      [characters]="characters" 
      (selectCharacter)="onSelectCharacter($event)"
      (deleteCharacter)="onDeleteCharacter($event)">
    </app-character-list>
    <app-character-details 
      *ngIf="selectedCharacter" 
      [character]="selectedCharacter" 
      (updateCharacter)="onUpdateCharacter($event)">
    </app-character-details>
    <app-character-form 
      (addCharacter)="onAddCharacter($event)">
    </app-character-form>
  `,
  standalone: true,
  imports: [NgFor, NgIf, CharacterListComponent, CharacterDetailsComponent, CharacterFormComponent, HttpClientModule],
  providers: [MarvelApiService]
})
export class AppComponent implements OnInit {
  characters: any[] = [];
  selectedCharacter: any;

  constructor(private marvelApiService: MarvelApiService) {}

  ngOnInit(): void {
    this.marvelApiService.getCharacters().subscribe(
      (data) => {
        this.characters = data.data.results; // Ajustamos según la respuesta de la API
      },
      (error) => {
        console.error('Error fetching characters:', error);
      }
    );
  }

  onSelectCharacter(character: any) {
    this.selectedCharacter = character;
  }

  onDeleteCharacter(characterId: number) {
    this.marvelApiService.deleteCharacter(characterId).subscribe(() => {
      this.characters = this.characters.filter(character => character.id !== characterId);
      this.selectedCharacter = null;
    });
  }

  onAddCharacter(character: any) {
    this.marvelApiService.addCharacter(character).subscribe(newCharacter => {
      this.characters.push(newCharacter); // Agrega el nuevo personaje a la lista
    });
  }

  onUpdateCharacter(updatedCharacter: any) {
    this.marvelApiService.updateCharacter(updatedCharacter.id, updatedCharacter).subscribe(() => {
      const index = this.characters.findIndex(character => character.id === updatedCharacter.id);
      if (index !== -1) {
        this.characters[index] = updatedCharacter; // Actualiza el personaje en la lista
      }
      this.selectedCharacter = null;
    });
  }
}

