import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ToastrService, ToastrModule } from 'ngx-toastr'; // Import ToastrService and ToastrModule

import { ProfileComponent } from './profile.component';

describe('ProfileComponent', () => {
    let component: ProfileComponent;
    let fixture: ComponentFixture<ProfileComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [ProfileComponent],
            imports: [HttpClientTestingModule, ToastrModule.forRoot()], // Add ToastrModule.forRoot()
            providers: [ToastrService], // Add ToastrService to providers
        });
        fixture = TestBed.createComponent(ProfileComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});