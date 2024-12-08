import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IconEComponent } from './icon-e.component';

describe('IconEComponent', () => {
  let component: IconEComponent;
  let fixture: ComponentFixture<IconEComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IconEComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IconEComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
