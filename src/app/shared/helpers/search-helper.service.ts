import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SearchHelperService {
  searchValue$: Subject<string>;

  constructor() {
    this.searchValue$ = new Subject();
  }

  emit (searchValue: string) {
    this.searchValue$.next(searchValue);
  }

  getSearchValues() {
    return this.searchValue$.asObservable();
  }
}
