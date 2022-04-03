import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, Inject, OnInit } from '@angular/core';

@Component({
  selector: 'app-synposis-card',
  templateUrl: './synposis-card.component.html',
  styleUrls: ['./synposis-card.component.scss']
})
export class SynposisCardComponent implements OnInit {

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
