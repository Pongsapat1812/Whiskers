import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IconCComponent } from './icon-c.component';

describe('IconCComponent', () => {
  let component: IconCComponent;
  let fixture: ComponentFixture<IconCComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IconCComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IconCComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
