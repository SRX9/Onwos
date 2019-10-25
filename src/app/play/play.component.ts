import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import axios from 'axios';
import { interval } from 'rxjs';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.css']
})
export class PlayComponent implements OnInit {
  login=false;

  currentPlay;
  currentStat;
  view;
  iniView=0;
  episodeArr;
  showTitle = this.route.snapshot.params['showname'];
  showObj;
  seasonObj;
  episodeNumber;
  currentComment=[]

  loading=false;
  constructor(private route: ActivatedRoute, private message: NzMessageService) { }

  ngOnInit() {
    if (localStorage.getItem("sxcvi") !==null) {
      this.login = true;
    }
    const numbers = interval(1000);

    const takeFourNumbers = numbers.pipe(take(86400));

    takeFourNumbers.subscribe(x => {
      if (localStorage.getItem("sxcvi") !== null) {
        this.login = true;
      }
      else {
        this.login = false;
      }
    });

    axios.get('http://localhost:3002/getEpisodes', {
      params: {
        seasonid: this.route.snapshot.params['seasonid']
      }
    }).then((response) => {
      this.episodeArr = response.data.episodes;
      this.seasonObj=response.data;
      console.log(this.seasonObj)
      for(let i=0;i<this.episodeArr.length;i++)
      {
        if (this.episodeArr[i].episodeid === this.route.snapshot.params['eid'])
        {
          this.currentPlay=this.episodeArr[i];

          this.episodeNumber=i+1;
        }
      }
      axios.get('http://localhost:3002/getShowPlay', {
        params: {
          showname: this.showTitle
        }
      }).then((response) => {
        this.showObj=response.data;
        axios.get('http://localhost:3002/getStat', {
          params: {
            episodeid: this.route.snapshot.params['eid']
          }
        }).then((response) => {
          this.currentStat=response.data;
          this.view = response.data.views;
        })
      });

      this.loading = false;
    });
  }

  sendComment=(text)=>{
    axios.post('/addComment', {
      userid:'',
      text:text,
      profile:'',
      episodeid:this.currentPlay.episodeid
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  addView=()=>{
    if(this.iniView===0)
    {
      this.view += 1;
      this.iniView=1;
      axios.get('http://localhost:3002/addView', {
        params: {
          episodeid: this.route.snapshot.params['eid']
        }
      }).then((response) => {
        if (response.data !== false) {
          this.currentStat = response.data;
        }
      });
    }

  }
}
