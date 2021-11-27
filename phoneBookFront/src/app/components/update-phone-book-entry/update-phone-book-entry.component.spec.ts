import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatePhoneBookEntryComponent } from './update-phone-book-entry.component';

describe('UpdatePhoneBookEntryComponent', () => {
  let component: UpdatePhoneBookEntryComponent;
  let fixture: ComponentFixture<UpdatePhoneBookEntryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdatePhoneBookEntryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdatePhoneBookEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
