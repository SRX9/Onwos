import { Component, OnInit,Input } from '@angular/core';

@Component({
  selector: 'app-videodetail',
  templateUrl: './videodetail.component.html',
  styleUrls: ['./videodetail.component.css']
})
export class VideodetailComponent implements OnInit {
  @Input() vid;
  constructor() { }

  ngOnInit() {
  }

}
