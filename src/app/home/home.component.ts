import { Component, OnInit } from '@angular/core';
import axios from 'axios';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  suggesstion = [];
  constructor() { }

  ngOnInit() {

    axios.get('http://localhost:3002/getSuggestions', {
      params: {
        country: "India"
      }
    }).then((response) => {
      let temp = []
      for (let i = 0; i < response.data.length; i++) {
        let buf = response.data[i];
        if (buf.title.length > 21) {
          buf.title = buf.title.slice(0, 21) + "...";
        }
        temp.push(buf)
      }
      this.suggesstion = temp;
    })
    .catch((error) => {
      console.log(error);
    })
  }




}
