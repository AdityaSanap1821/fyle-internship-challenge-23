import { Component, Input } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent {
    constructor(private apiService: ApiService, private toastr: ToastrService) { }
    // User Data from Search Component
    @Input() profileData: any;
    @Input() pageSize: number = 10;

    currentPage: number = 1;
    totalItems: number = 0;
    totalPages: number = 1;
    twitterUrl: string = '';
    repoData: any; // Data from Repo API
    pageOptions = [10, 50, 100];
    isOpen = false; // Boolean for Dropdown

    // Works on Page Load
    ngOnInit() {
        this.getRepoData(this.profileData?.repos_url); // Calling for Default Page Size
        this.totalItems = this.profileData?.public_repos;
        this.totalPages = Math.ceil(
            this.totalItems / this.pageSize >= 0 ? this.totalItems / this.pageSize : 1
        );
        this.twitterUrl = `https://twitter.com/${this.profileData?.twitter_username}`;
    }

    /**
     * @description Get Repo Data of the user
     * @argument path repositories path of the user
     * @returns void
     */
    getRepoData(path: string) {
        this.apiService
            .getData(path + `?page=${this.currentPage}&per_page=${this.pageSize}`)
            .subscribe(
                (data: any) => {
                    this.repoData = data;
                    this.scrollToTop();
                },
                (error) => {
                    this.toastr.error(
                        'Unable to fetch user from Github!',
                        'Error Message'
                    );
                }
            );
    }

    /**
     * @description Increments current page and calls repo API
     */
    nextPage() {
        if (this.currentPage < this.totalPages) {
            this.currentPage++;
            this.getRepoData(this.profileData.repos_url);
        }
    }

    /**
     * @description Decrements current page and calls repo API
     */
    previousPage() {
        if (this.currentPage > 1) {
            this.currentPage--;
            this.getRepoData(this.profileData.repos_url);
        }
    }

    /**
     * @description Get array of numbers from 0 to n
     * @param n
     * @returns Array
     */
    getRange(n: number): number[] {
        return Array.from({ length: n }, (_, index) => index + 1);
    }

    /**
     * @description Sets current page to page and calls repo API
     * @param page
     */
    setPage(page: number) {
        if (page === -1) {
            // Clicked on ellipsis, expand the displayed pages range
            this.currentPage = this.currentPage + this.displayedPageSize + 1;
        } else {
            // Clicked on a regular page, set the current page
            this.currentPage = page;
        }
        this.getRepoData(this.profileData.repos_url);
    }

    scrollToTop() {
        // window.scrollTo({ top: 0, behavior: 'smooth' });
        var scrollElem: Element | null = document.querySelector('#user-details');
        scrollElem?.scrollIntoView({ behavior: 'smooth' });
    }

    /**
     * @description Sets page size to size and calls repo API
     * @param size
     */
    setPageSize(size: number) {
        this.pageSize = size;
        this.getRepoData(this.profileData.repos_url);
        this.currentPage = 1;
        this.totalPages = Math.ceil(
            this.totalItems / this.pageSize >= 0 ? this.totalItems / this.pageSize : 1
        );
        this.handleDropDown();
    }

    handleDropDown() {
        this.isOpen = !this.isOpen;
    }
    /**
     * @description returns pages array with all pages and if pages size exceeds page size then returns array with a -1 to display ...
     * @returns number[] array of pages
     */
    displayedPageSize = 5;
    get displayedPages(): number[] {
        const pages = [];
        pages.push(1);

        if (this.currentPage - this.displayedPageSize > 2) {
            pages.push(-1);
        }

        const start = Math.max(2, this.currentPage - this.displayedPageSize);
        const end = Math.min(
            this.totalPages - 1,
            this.currentPage + this.displayedPageSize
        );

        for (let i = start; i <= end; i++) {
            pages.push(i);
        }

        if (this.totalPages - this.currentPage - this.displayedPageSize > 1) {
            pages.push(-1);
        }

        if (this.totalPages > 1) {
            pages.push(this.totalPages);
        }

        return pages;
    }
}