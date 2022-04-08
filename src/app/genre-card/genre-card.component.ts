/**
 * The GenreCardComponent renders genre information when genre button is clicked on movie card.
 * @module GenreCardComponent
 */
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-genre-card',
  templateUrl: './genre-card.component.html',
  styleUrls: ['./genre-card.component.scss']
})
export class GenreCardComponent implements OnInit {

  /**
   *  Constructor Injection
   *  The data that was passed to Genre dialog in the MovieCardComponent is injected in to the constructor using 
   *  MAT_DIALOG_DATA injection token.
   */
  constructor(
    @Inject(MAT_DIALOG_DATA) public data : { 
      name: string,
      description: string,
    }
  ) { }

  ngOnInit(): void {
  }

}
