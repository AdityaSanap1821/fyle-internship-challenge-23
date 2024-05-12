import { Component, Input } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
    selector: 'app-repoview',
    templateUrl: './repoview.component.html',
    styleUrls: ['./repoview.component.scss'],
})
export class RepoviewComponent {
    constructor(private apiService: ApiService) { }

    // User Data from Profile Component
    @Input() data: any;

    /**
     * @description Returns Elapsed time from updated_at timestamp
     * @param updatedAt
     * @returns Time difference
     */
    getElapsedTime(updatedAt: string) {
        var currentDate = new Date();

        return this.timeDifference(currentDate.toString(), updatedAt);
    }

    /**
     * @description Time difference string
     * @param current
     * @param previous
     * @returns string
     */
    timeDifference(current: string, previous: string) {
        var msPerMinute = 60 * 1000;
        var msPerHour = msPerMinute * 60;
        var msPerDay = msPerHour * 24;
        var msPerMonth = msPerDay * 30;
        var msPerYear = msPerDay * 365;

        var currentDate = Date.parse(current);
        var previousDate = Date.parse(previous);

        var elapsed = currentDate - previousDate;

        if (elapsed < msPerMinute) {
            return Math.round(elapsed / 1000) + ' seconds ago';
        } else if (elapsed < msPerHour) {
            return Math.round(elapsed / msPerMinute) + ' minutes ago';
        } else if (elapsed < msPerDay) {
            return Math.round(elapsed / msPerHour) + ' hours ago';
        } else if (elapsed < msPerMonth) {
            return Math.round(elapsed / msPerDay) + ' days ago';
        } else if (elapsed < msPerYear) {
            return Math.round(elapsed / msPerMonth) + ' months ago';
        } else {
            return Math.round(elapsed / msPerYear) + ' years ago';
        }
    }
}