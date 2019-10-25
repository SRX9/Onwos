import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import axios from 'axios';
import { interval } from 'rxjs';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-seasondetail',
  templateUrl: './seasondetail.component.html',
  styleUrls: ['./seasondetail.component.css']
})
export class SeasondetailComponent implements OnInit {
  homeuser=false;

  seasonObj;
  episodeArr=[];
  showobj;
  loading=false;

  showSpin=false;
  vidrender=false;
  showPlace=true;

  epicreate=false;
  openCreate = () => {
    this.epicreate = true;
  }
  cancelCreate = () => {
    this.epicreate = false;
  }


  startUpdate = false;
  updated = false;
  percentup = 0;
  fileToUpload: any = null;
  episodeSrc: any =null;

  constructor(private route: ActivatedRoute, private message: NzMessageService) { }

  getEpisode=(event)=>{
    this.showPlace=false;
    this.showSpin=true;
    this.fileToUpload = event.target.files[0]
    var reader = new FileReader();
    reader.onload = () => {
      this.episodeSrc = reader.result;
      this.showSpin = false;
      this.vidrender=true;
    };
    reader.readAsDataURL(event.target.files[0]);

  }

  ngOnInit() {
    this.loading=true;
    axios.get('http://localhost:3002/getSeasonInfo', {
      params: {
        seasonid: this.route.snapshot.params['seasonid']
      }
    }).then((response) => {
      this.seasonObj = response.data;
      axios.get('http://localhost:3002/getShowProfile', {
        params: {
          showid: this.seasonObj.showid
        }
      }).then((response) => {
          this.showobj = response.data;
          axios.get('http://localhost:3002/getEpisodes', {
            params: {
              seasonid: this.route.snapshot.params['seasonid']
            }
          }).then((response) => {
            this.episodeArr=response.data.episodes;
            this.loading=false;
            if (localStorage.getItem("sxcvi") === this.showobj.userid) {
              this.homeuser = true;
            }
            const numbers = interval(1000);

            const takeFourNumbers = numbers.pipe(take(86400));

            takeFourNumbers.subscribe(x => {
              if (localStorage.getItem("sxcvi") === this.showobj.userid) {
                this.homeuser = true;
              }
              else {
                this.homeuser = false;
              }
            });
          });
        })
        .catch((error) => {
          console.log(error);
        });
    })
    .catch((error) => {
      console.log(error);
    });

  }
  createEpisode=(title,des)=>{
    if (this.fileToUpload === null) {
      this.message.create("warning", `Plz Select a Video for Episode`);
    }
    else if (title.trim() === "" || des.trim() === '' ) {
      this.message.create("warning", `Plz Fill all required information`);
    }
    else {
      this.startUpdate = true;
      let bodyFormData = new FormData();
      const config = {
        onUploadProgress: (progressEvent) => {
          var percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          this.percentup = percentCompleted;
        }
      }

      bodyFormData.append('vid', this.fileToUpload);
      bodyFormData.append('showid', this.showobj.showid);
      bodyFormData.append('seasonid', this.seasonObj.seasonid);
      bodyFormData.append('title', title);
      bodyFormData.append('description', des);
      bodyFormData.append('episodeNo',(this.episodeArr.length+1).toString());

      axios.put('http://localhost:3000/uploadEpisode', bodyFormData, config)
        .then(res => {
          if (res.data === false) {
            this.message.create("warning", `Server Error Plz Try after sometime`);
            this.updated = false;
            this.percentup = 0;
            this.fileToUpload = null;
          }
          else {
            axios.get('http://localhost:3002/getEpisodes', {
              params: {
                seasonid: this.route.snapshot.params['seasonid']
              }
            }).then((response) => {
              this.episodeArr = response.data.episodes;
              this.loading = false;
            });
            this.startUpdate = false;
            this.updated = true;
            setTimeout(() => {
              this.updated = false;
              this.percentup = 0;
              this.showPlace=true;
              this.episodeSrc=null;
              this.fileToUpload = null;
              this.epicreate=false
            }, 1000)
          }

        })
        .catch(err => console.log(err));
    }
  }
}
