import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { ApiService } from './api.service';

interface UserData {
  name: string;
  location: string;
  bio: string;
  twitter_username: string;
}

describe('ApiService', () => {
  let service: ApiService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(ApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get user details with status 200 and expected properties', () => {
    const githubUsername = 'johnpapa';

    const expectedUserData: UserData = {
      name: 'John Papa',
      location: 'Orlando, FL',
      bio: 'Winter is Coming',
      twitter_username: 'john_papa',
    };

    // Make the actual HTTP request
    service.getUser(githubUsername).subscribe((userData: any) => {
      expect(userData.name).toBe(expectedUserData.name);
      expect(userData.location).toBe(expectedUserData.location);
      expect(userData.bio).toBe(expectedUserData.bio);
      expect(userData.twitter_username).toBe(expectedUserData.twitter_username);
    });

    // Set up the mock request
    const req = httpMock.expectOne(
      `https://api.github.com/users/${githubUsername}`
    );
    expect(req.request.method).toBe('GET');

    // Respond to the request with the expected user data
    req.flush(expectedUserData, { status: 200, statusText: 'OK' });
  });

  it('should make a GET request with the provided API path', () => {
    const apiPath = 'https://api.github.com/users/johnpapa';

    // Make the actual HTTP request
    service.getData(apiPath).subscribe();

    // Set up the mock request
    const req = httpMock.expectOne(apiPath);
    expect(req.request.method).toBe('GET');

    // Flush a dummy response
    req.flush({ status: 'OK' }, { status: 200, statusText: 'OK' });
  });
});