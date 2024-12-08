import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecDComponent } from './sec-d.component';

describe('SecDComponent', () => {
  let component: SecDComponent;
  let fixture: ComponentFixture<SecDComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SecDComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SecDComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
