import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjouterCategoriePieceComponent } from './ajouter-categorie-piece.component';

describe('AjouterCategoriePieceComponent', () => {
  let component: AjouterCategoriePieceComponent;
  let fixture: ComponentFixture<AjouterCategoriePieceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AjouterCategoriePieceComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AjouterCategoriePieceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
