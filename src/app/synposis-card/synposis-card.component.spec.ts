import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SynposisCardComponent } from './synposis-card.component';

describe('SynposisCardComponent', () => {
  let component: SynposisCardComponent;
  let fixture: ComponentFixture<SynposisCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SynposisCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SynposisCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
