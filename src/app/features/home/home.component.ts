import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { State } from '../form/state/form.state.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private state: Store<State>) {}


  ngOnInit(): void {
    
  }

}
