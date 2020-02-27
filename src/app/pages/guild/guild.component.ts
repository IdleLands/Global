import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { APIService } from '../../api.service';

@Component({
  selector: 'app-guild',
  templateUrl: './guild.component.html',
  styleUrls: ['./guild.component.scss']
})
export class GuildComponent implements OnInit {

  public loading = true;
  public guild = null;

  constructor(private router: Router, private route: ActivatedRoute, private api: APIService) { }

  ngOnInit() {
    const name = this.route.snapshot.paramMap.get('name');
    if (!name) { return; }

    this.api.getGuild(name)
      .subscribe((guild: any) => {
        if (!guild) {
          this.router.navigate(['/guilds']);
          return;
        }

        this.loading = false;
        this.guild = guild;
      });
  }

  public guildLevel(): number {
    const levels: number[] = Object.values(this.guild.buildingLevels);
    return Math.floor(levels.reduce((prev, cur) => prev + cur, 0) / levels.length);
  }

  public memberCount(): number {
    return Object.keys(this.guild.members).length;
  }

  public titleCase(str: string): string {
    return str.split(' ').map(word => {
      return word.charAt(0).toUpperCase() + word.slice(1);
    }).join(' ');
  }

  public getValuesTotal(obj: any) {
    let sum = 0;
    Object.keys(obj).forEach(item => sum += obj[item]);
    return sum;
  }

  // Used to convert object keys into readable strings. EG: factory:item -> Item Factory
  public formatWord(str: string): string {
    const [type, value] = str.split(':');

    if (type.startsWith('Crystal')) {
      return `${type.slice(7)} Crystals`;
    }

    switch (type) {
      case 'guildhall': return 'Guild Hall';
      case 'generator':
      case 'factory': return `${value} ${type}`;
      case 'garden': return `${value.toUpperCase()} ${type}`;
      case 'upkept':
      case 'person':
      case 'active':
        switch (value) {
          case 'raidportal': return 'Raid Portal';
          case 'witchdoctor': return 'Witch Doctor';
          default: return value;
        }
      default: return value ? `${type}:${value}` : type;
    }
  }

  public symbolFor(guildLv: number): string {
    switch (guildLv) {
      case 1: return '';
      case 5: return '☆';
      case 10: return '★';
      default: return '';
    }
  }

}
