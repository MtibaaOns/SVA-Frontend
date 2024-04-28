import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjouterPieceRechangeComponent } from './ajouter-piece-rechange.component';

describe('AjouterPieceRechangeComponent', () => {
  let component: AjouterPieceRechangeComponent;
  let fixture: ComponentFixture<AjouterPieceRechangeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AjouterPieceRechangeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AjouterPieceRechangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
