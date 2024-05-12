import { Component, ViewEncapsulation } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { ToastrService } from 'ngx-toastr';

export interface ProfileData {
    avatar_url: string;
    name: string;
    bio: string;
    location: string;
    twitter_username: string;
    html_url: string;
};

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class SearchComponent {
    constructor(private apiService: ApiService, private toastr: ToastrService) { }

    githubUsername = '';
    public profileData!: ProfileData; // Profile Data from API
    public showProfile: boolean = false;
    public loading: boolean = false;
    public errorMessage: string = '';

    /**
     * @description Call Github API for getting github user data
     */
    searchGithubUsers() {
        if (this.githubUsername === '') {
            this.errorMessage = 'Please enter a username.';
            this.toastr.warning(this.errorMessage, 'Warning');
            setTimeout(() => {
                this.errorMessage = ''; // Clear error message after 3 seconds
            }, 3000);
        } else {
            this.loading = true;
            this.apiService.getUser(this.githubUsername)?.subscribe(
                (res: ProfileData) => {
                    this.profileData = res;
                    setTimeout(() => {
                        this.loading = false;
                        this.showProfile = true;
                    }, 1000);
                },
                (error) => {
                    this.loading = false;
                    this.errorMessage = 'Unable to fetch user from Github!';
                    this.toastr.error(this.errorMessage, 'Error Message');
                    setTimeout(() => {
                        this.errorMessage = ''; // Clear error message after 3 seconds
                    }, 3000);
                }
            );
        }
    }
}
