import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecGComponent } from './sec-g.component';

describe('SecGComponent', () => {
  let component: SecGComponent;
  let fixture: ComponentFixture<SecGComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SecGComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SecGComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
