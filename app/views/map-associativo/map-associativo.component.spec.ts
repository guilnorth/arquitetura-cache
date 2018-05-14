import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapAssociativoComponent } from './map-associativo.component';

describe('MapAssociativoComponent', () => {
  let component: MapAssociativoComponent;
  let fixture: ComponentFixture<MapAssociativoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapAssociativoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapAssociativoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
