import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Regisatrion } from './regisatrion';

describe('Regisatrion', () => {
  let component: Regisatrion;
  let fixture: ComponentFixture<Regisatrion>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Regisatrion],
    }).compileComponents();

    fixture = TestBed.createComponent(Regisatrion);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
