import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { Tab3Page } from './tab3.page';

describe('Tab3Page', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        Tab3Page
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(Tab3Page);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'ng2-charts-demo'`, () => {
    const fixture = TestBed.createComponent(Tab3Page);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('ng2-charts-demo');
  });

});
