import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeCategoriePieceComponent } from './liste-categorie-piece.component';

describe('ListeCategoriePieceComponent', () => {
  let component: ListeCategoriePieceComponent;
  let fixture: ComponentFixture<ListeCategoriePieceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListeCategoriePieceComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListeCategoriePieceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
