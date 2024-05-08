import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeIntervPieceComponent } from './liste-interv-piece.component';

describe('ListeIntervPieceComponent', () => {
  let component: ListeIntervPieceComponent;
  let fixture: ComponentFixture<ListeIntervPieceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListeIntervPieceComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListeIntervPieceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
