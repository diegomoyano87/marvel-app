import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Md5 } from 'ts-md5';

@Injectable({
  providedIn: 'root',
})
export class MarvelApiService {
  private baseUrl = 'https://gateway.marvel.com:443/v1/public/characters';
  private publicKey = 'd6bc4e7f71ae49e41d74032b7ca1fcf1';  
  private privateKey = 'dcad99a0a681e5678a27fd8ba7b795a6f2eb6e48'; 
  private ts = new Date().getTime();  
  private hash = Md5.hashStr(this.ts + this.privateKey + this.publicKey); 

  private localCharacters: any[] = [];

  constructor(private http: HttpClient) {}

  getCharacters(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}?ts=${this.ts}&apikey=${this.publicKey}&hash=${this.hash}`);
  }

  addCharacter(character: any): Observable<any> {
    character.id = Date.now();  
    this.localCharacters.push(character);  
    return of(character);  
  }

  updateCharacter(id: number, updatedCharacter: any): Observable<any> {
    const index = this.localCharacters.findIndex(char => char.id === id);  
    if (index !== -1) {
      this.localCharacters[index] = updatedCharacter;  
    }
    return of(updatedCharacter);  
  }

  deleteCharacter(id: number): Observable<any> {
    this.localCharacters = this.localCharacters.filter(character => character.id !== id);  
    return of(null);  
  }
}
