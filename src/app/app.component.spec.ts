import { TestBed, async } from '@angular/core/testing';

import { AppComponent } from './app.component';

import { SearchComponent } from './components/search/search.component';
import { ProfileComponent } from './components/profile/profile.component';
import { RepoviewComponent } from './components/repoview/repoview.component';

import { LoaderComponent } from './components/loader/loader.component';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ToastrModule } from 'ngx-toastr';
import { NgxTypedJsModule } from 'ngx-typed-js';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        SearchComponent,
        ProfileComponent,
        RepoviewComponent,
        LoaderComponent,
      ],
      imports: [
        HttpClientTestingModule,
        ToastrModule.forRoot(),
        NgxTypedJsModule,
      ],
      providers: [],
    }).compileComponents();
  }));
  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
});
