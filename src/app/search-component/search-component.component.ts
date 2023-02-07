import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs';
import { SearchHelperService } from '../shared/services/search-helper.service';

@Component({
  selector: 'app-search-component',
  templateUrl: './search-component.component.html',
  styleUrls: ['./search-component.component.scss'],
})
export class SearchComponentComponent {
  @Input() placeholder = '';
  textSearched = '';

  constructor(private searchHelper: SearchHelperService) {}

  onTyping() {
    this.searchHelper.emit(this.textSearched.trim());
  }

  onReset() {
    this.textSearched = '';
    this.searchHelper.emit('');
  }
}
