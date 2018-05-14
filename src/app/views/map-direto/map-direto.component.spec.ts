import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapDiretoComponent } from './map-direto.component';

describe('MapDiretoComponent', () => {
  let component: MapDiretoComponent;
  let fixture: ComponentFixture<MapDiretoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapDiretoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapDiretoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
