import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListePieceRechangeComponent } from './liste-piece-rechange.component';

describe('ListePieceRechangeComponent', () => {
  let component: ListePieceRechangeComponent;
  let fixture: ComponentFixture<ListePieceRechangeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListePieceRechangeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListePieceRechangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
