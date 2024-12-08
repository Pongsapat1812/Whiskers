import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IconDComponent } from './icon-d.component';

describe('IconDComponent', () => {
  let component: IconDComponent;
  let fixture: ComponentFixture<IconDComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IconDComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IconDComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
