import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SearchComponent } from './search.component';
import { ProfileComponent } from '../profile/profile.component';
import { LoaderComponent } from '../loader/loader.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NgxTypedJsModule } from 'ngx-typed-js';
import { ToastrModule } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';

describe('SearchComponent', () => {
    let component: SearchComponent;
    let fixture: ComponentFixture<SearchComponent>;
    let apiService: jasmine.SpyObj<ApiService>;

    beforeEach(() => {
        apiService = jasmine.createSpyObj('ApiService', ['getUser']);
        TestBed.configureTestingModule({
            declarations: [SearchComponent, ProfileComponent, LoaderComponent],
            imports: [
                HttpClientTestingModule,
                NgxTypedJsModule,
                ToastrModule.forRoot(),
                CommonModule,
                FormsModule,
            ],
            providers: [
                { provide: ApiService, useValue: apiService },
            ],
        });
        fixture = TestBed.createComponent(SearchComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should set loading to true when searchGithubUsers is called', () => {
        // Arrange
        component.githubUsername = 'johnpapa';

        // Act
        component.searchGithubUsers();

        // Assert
        expect(component.loading).toBe(true);
    });
});