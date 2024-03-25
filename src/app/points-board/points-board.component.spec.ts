import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PointsBoardComponent } from './points-board.component';

describe('PointsBoardComponent', () => {
  let component: PointsBoardComponent;
  let fixture: ComponentFixture<PointsBoardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PointsBoardComponent]
    });
    fixture = TestBed.createComponent(PointsBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
