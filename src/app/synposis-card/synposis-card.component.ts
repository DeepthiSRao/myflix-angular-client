/**
 * The SynposisCardComponent renders movie information when synposis button is clicked on movie card.
 * @module SynposisCardComponent
 */
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, Inject, OnInit } from '@angular/core';

@Component({
  selector: 'app-synposis-card',
  templateUrl: './synposis-card.component.html',
  styleUrls: ['./synposis-card.component.scss']
})
export class SynposisCardComponent implements OnInit {

  /**
   *  Constructor Injection
   *  The data that was passed to Synposis dialog in the MovieCardComponent is injected in to the constructor using 
   *  MAT_DIALOG_DATA injection token.
   */
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      title: string,
      description: string,
    }
  ) { }

  ngOnInit(): void {
  }

}
