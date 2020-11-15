import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss']
})
export class ErrorComponent implements OnInit {

  errorMessage = 'For some reason you\'ve reached a page with an error. You probably tried to reach a page that you don\t have access to. Head back to where you were. If you\'d like to stop encountering this error, don\'t do whatever it was that you just did.'

  constructor() { }

  ngOnInit(): void {
  }

}
