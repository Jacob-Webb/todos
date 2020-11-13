import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BasicAuthenticationService } from '../service/basic-authentication.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {
  name = ''

  constructor(private route:ActivatedRoute,
    private basicAuth: BasicAuthenticationService) { }

  ngOnInit(): void {
    this.name = this.route.snapshot.params['name']
  }

}
