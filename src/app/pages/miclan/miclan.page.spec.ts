import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MiclanPage } from './miclan.page';

describe('MiclanPage', () => {
  let component: MiclanPage;
  let fixture: ComponentFixture<MiclanPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MiclanPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MiclanPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
