import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { APIService } from '../../api.service';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnInit {

  public loading = true;
  public player = null;

  constructor(private router: Router, private route: ActivatedRoute, private api: APIService) { }

  ngOnInit() {
    const name = this.route.snapshot.paramMap.get('name');
    if (!name) { return; }

    this.api.getPlayer(name)
      .subscribe((player: any) => {
        if (!player) {
          this.router.navigate(['/players']);
          return;
        }

        this.loading = false;
        this.player = player;
      });
  }

}
