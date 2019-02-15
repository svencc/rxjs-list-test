import { Observable } from 'rxjs';
import { Person } from '../model/person';

export interface DataProviderInterface {
  persons$: Observable<Person[]>;

  getData(): void;
}
