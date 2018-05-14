import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfiguraProcessoComponent } from './configura-processo.component';

describe('ConfiguraProcessoComponent', () => {
  let component: ConfiguraProcessoComponent;
  let fixture: ComponentFixture<ConfiguraProcessoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfiguraProcessoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfiguraProcessoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
