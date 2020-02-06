import { Component, OnInit } from '@angular/core';
import { APIService } from '../../api.service';

@Component({
  selector: 'app-guilds',
  templateUrl: './guilds.component.html',
  styleUrls: ['./guilds.component.scss']
})
export class GuildsComponent implements OnInit {

  public loading = true;
  public guilds = [];

  constructor(private api: APIService) { }

  ngOnInit() {
    this.api.getGuilds()
      .subscribe((guilds: any[]) => {
        this.loading = false;
        this.guilds = guilds;
      });
  }

  public guildLevel(guild): number {
    const levels: number[] = Object.values(guild.buildingLevels);
    return Math.floor(levels.reduce((prev, cur) => prev + cur, 0) / levels.length);
  }

  public memberCount(guild): number {
    return Object.keys(guild.members).length;
  }

}
