import { Component, EventEmitter, HostListener, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { SearchState } from '../model/searchState';

@Component({
  selector: 'app-thumb-index',
  templateUrl: './thumb-index.component.html',
  styleUrls: ['./thumb-index.component.css']
})
export class ThumbIndexComponent implements OnInit {

  public letters: string[] = [];

  @HostListener('click', ['$event.target'])
  onClick(target) {
    if (target.innerHTML.length === 1) {
      this.letterClicked.next(target.innerHTML);
    }
  }

  @Output()
  public letterClicked = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {
    this.letters = this.letterRange('A', 'Z');
  }

  private letterRange(start, stop): string[] {
    const range = [];
    for (let idx = start.charCodeAt(0), end = stop.charCodeAt(0); idx <= end; ++idx) {
      range.push(String.fromCharCode(idx));
    }

    return range;
  }

}
