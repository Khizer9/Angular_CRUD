import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddcitycompComponent } from './addcitycomp.component';

describe('AddcitycompComponent', () => {
  let component: AddcitycompComponent;
  let fixture: ComponentFixture<AddcitycompComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddcitycompComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddcitycompComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
