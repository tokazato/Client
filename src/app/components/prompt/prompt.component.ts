import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-prompt',
  templateUrl: './prompt.component.html',
  styleUrls: ['./prompt.component.scss'],
})
export class PromptComponent implements OnInit {
  @Input()
  title: string;

  @Input()
  isShow = false;

  @Output() promptEvent = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  close() {
    this.isShow = false;
    this.promptEvent.next(false);
  }

  accept() {
    this.isShow = false;
    this.promptEvent.next(true);
  }
}
