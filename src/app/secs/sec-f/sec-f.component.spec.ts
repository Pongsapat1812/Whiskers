import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecFComponent } from './sec-f.component';

describe('SecFComponent', () => {
  let component: SecFComponent;
  let fixture: ComponentFixture<SecFComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SecFComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SecFComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
