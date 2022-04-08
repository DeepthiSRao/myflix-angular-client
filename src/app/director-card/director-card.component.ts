/**
 * The DirectorCardComponent renders director information when director button is clicked on movie card.
 * @module DirectorCardComponent
 */
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-director-card',
  templateUrl: './director-card.component.html',
  styleUrls: ['./director-card.component.scss']
})
export class DirectorCardComponent implements OnInit {
  /**
   *  Constructor Injection
   *  The data that was passed to Director dialog in the MovieCardComponent is injected in to the constructor using 
   *  MAT_DIALOG_DATA injection token.
   */
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: { 
      name: string,
      bio: string,
      birth: string,
      death: string,
    }
  ) { }

  ngOnInit(): void {
  }

}
