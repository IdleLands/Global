import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class APIService {

  private get apiUrl() {
    return environment.apiUrl;
  }

  constructor(private http: HttpClient) { }

  getPlayers() {
    return this.http.get(`${this.apiUrl}/players`);
  }

  getPlayer(name: string) {
    return this.http.get(`${this.apiUrl}/player`, { params: { name } });
  }

  getGuilds() {
    return this.http.get(`${this.apiUrl}/guilds`);
  }

  getGuild(name: string) {
    return this.http.get(`${this.apiUrl}/guild`, { params: { name } });
  }

  getLeaderboard() {
    return this.http.get(`${this.apiUrl}/leaderboard`);
  }
}
