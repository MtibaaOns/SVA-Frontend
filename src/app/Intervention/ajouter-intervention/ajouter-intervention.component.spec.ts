import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjouterInterventionComponent } from './ajouter-intervention.component';

describe('AjouterInterventionComponent', () => {
  let component: AjouterInterventionComponent;
  let fixture: ComponentFixture<AjouterInterventionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AjouterInterventionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AjouterInterventionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
