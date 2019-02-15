import { Injectable, OnInit } from '@angular/core';
import { DataProviderInterface } from './data-provider.interface';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { Person } from '../model/person';

@Injectable({
  providedIn: 'root'
})
export class DataProviderService implements DataProviderInterface {

  private personsSubject = new BehaviorSubject<Person[]>([]);
  public persons$ = this.personsSubject.asObservable();

  constructor(private httpClient: HttpClient) { }

  public getData(): void {
    this.httpClient.get('https://uinames.com/api/?amount=500')
      .subscribe(
        (persons: Person[]) => this.personsSubject.next(persons)
      );
  }
}
