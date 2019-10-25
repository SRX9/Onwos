import { Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-video-list',
  templateUrl: './video-list.component.html',
  styleUrls: ['./video-list.component.css']
})
export class VideoListComponent implements OnInit {
  vidList=[
    {
      profile:"https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTXtORqrUbVK3QHWUl8oPK8SW6yGvZiL3bXu6I0rRMiBa2s9tmn",
      title:"Ellen Show",
      season:15,
      user:"Ellen Degeneres",
      poster:"https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTu1vzvTT-A6bl6kxie-G7HDtoYliseqWwpXLXP3-q_oOhV559V"
    },
    {
      profile:'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTiHwY_43xBBxtcHZzSISL0QWqMQgVUfhwzJjJ6Ldls_4fqcdAS',
      title:"The Kapil Sharma Show",
      season:2,
      user:"Kapil Sharma",
      poster:"https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRiNlqjSFZQQKohZuw4ZXgPcg82Ik-8JXfcgn_nW2WQ_8mSr8Oi"
    }
  ];
  constructor() { }

  ngOnInit() {
  }

}
