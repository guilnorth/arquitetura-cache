import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapAssociativoConjuntoComponent } from './map-associativo-conjunto.component';

describe('MapAssociativoConjuntoComponent', () => {
  let component: MapAssociativoConjuntoComponent;
  let fixture: ComponentFixture<MapAssociativoConjuntoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapAssociativoConjuntoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapAssociativoConjuntoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
