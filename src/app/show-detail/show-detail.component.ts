import { Component, OnInit } from '@angular/core';
import { ActivatedRoute ,Router} from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import axios from 'axios';
import { interval } from 'rxjs';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-show-detail',
  templateUrl: './show-detail.component.html',
  styleUrls: ['./show-detail.component.css']
})
export class ShowDetailComponent implements OnInit {
  constructor(private router:Router,private route: ActivatedRoute, private message: NzMessageService) { }
  homeuser = false;

  fan = false;
  fans = 0;

  showObj;
  seasonArr=[];
  showcreate=false;
  fileToUpload:any=null;
  seasonPhoto: any = "http://cdn.shoplightspeed.com/shops/603282/themes/3641/assets/placeholder-image.png?20190703175014"
  release:any=null;

  startUpdate = false;
  updated = false;
  percentup = 0;

  ngOnInit() {
    axios.get('http://localhost:3002/getShowProfile', {
      params: {
        showid: this.route.snapshot.params['showid']
      }
    }).then((response)=>{
        this.showObj=response.data;
        this.fans=this.showObj.followers.length-1;
        for (let i = 1; i < this.showObj.followers.length;i++)
        {
          if (this.showObj.followers[i].userid === localStorage.getItem("sxcvi"))
          {
            this.fan=true;
          }
        }
        if (localStorage.getItem("sxcvi") === response.data.userid) {
        this.homeuser = true;
      }
      const numbers = interval(1000);
        const takeFourNumbers = numbers.pipe(take(86400));
        takeFourNumbers.subscribe(x => {
          if (this.route.snapshot.params['showid'] !== this.showObj.showid) {
            axios.get('http://localhost:3002/getShowProfile', {
              params: {
                showid: this.route.snapshot.params['showid']
              }
            }).then((response) => {
              this.showObj = response.data;
              this.fans = this.showObj.followers.length - 1;
              for (let i = 1; i < this.showObj.followers.length; i++) {
                if (this.showObj.followers[i].userid === localStorage.getItem("sxcvi")) {
                  this.fan = true;
                }
              }
              if (localStorage.getItem("sxcvi") === response.data.userid) {
                this.homeuser = true;
              }
            });
          }
        if (localStorage.getItem("sxcvi") === response.data.userid)
        {

          this.homeuser = true;
        }
        else {
          this.homeuser = false;
        }
      });
      axios.get('http://localhost:3002/getShowSeasons', {
        params: {
          showid: this.route.snapshot.params['showid']
        }
      }).then((response) => {
        this.seasonArr = response.data;
      })
        .catch((error) => {
          console.log(error);
        })
    })
    .catch((error)=>{
      console.log(error);
    })
  }

  openCreate=()=>{
    this.showcreate=true;
  }
  cancelCreate=()=>{
    this.showcreate=false;
  }
  addFollow = () => {
    if (localStorage.getItem('sxcvi') === null) {
      this.router.navigateByUrl('/login')
    }
    else {
      if (this.fan) {
        this.fans = this.fans - 1;
        axios.get('http://localhost:3002/removeFollow', {
          params: {
            fanid: localStorage.getItem('sxcvi'),
            showid: this.showObj.showid
          }
        }).then((response) => {
          this.fan = false;
        });
      }
      else {
        axios.get('http://localhost:3002/addFollow', {
          params: {
            fanid: localStorage.getItem('sxcvi'),
            showid: this.showObj.showid
          }
        }).then((response) => {
          this.fan = true;
          this.fans = this.fans + 1;
        })
      }
    }
  }


  getSeasonPhoto = (event) => {
    this.fileToUpload = event.target.files[0]
    var reader = new FileReader();
    reader.onload = () => {
      this.seasonPhoto = reader.result
    };
    reader.readAsDataURL(event.target.files[0]);
  }
  createSeason= (title, des) => {
    if (this.fileToUpload === null) {
      this.message.create("warning", `Plz Upload a Poster of the Show`);
    }
    else if (title.trim()==="" || des.trim()==="", this.release===null)
    {
      this.message.create("warning", `Plz Fill all required information`);
    }
    else{
      this.startUpdate = true;
      let bodyFormData = new FormData();
      const config = {
        onUploadProgress: (progressEvent) => {
          var percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          this.percentup = percentCompleted;
        }
      }

      bodyFormData.append('img', this.fileToUpload);
      bodyFormData.append('userid', this.showObj.userid);
      bodyFormData.append('showid', this.showObj.showid);
      bodyFormData.append('title', title);
      bodyFormData.append('seasonNo',this.seasonArr.length.toString());
      bodyFormData.append('description', des);
      bodyFormData.append('release',this.release );

      axios.put('http://localhost:3000/createSeason', bodyFormData, config)
        .then(res => {
          if(res.data===false)
          {
            this.message.create("warning", `Server Error Plz Try after sometime`);
            this.updated = false;
            this.percentup = 0;
            this.release = null;
            this.seasonPhoto = "http://cdn.shoplightspeed.com/shops/603282/themes/3641/assets/placeholder-image.png?20190703175014";
            this.fileToUpload = null;
          }
          else{
            let temp = this.seasonArr;
            temp.unshift(res.data);
            this.seasonArr = temp;
            this.startUpdate = false;
            this.updated = true;
            setTimeout(() => {
              this.updated = false;
              this.percentup = 0;
              this.release = null;
              this.seasonPhoto = "http://cdn.shoplightspeed.com/shops/603282/themes/3641/assets/placeholder-image.png?20190703175014";
              this.fileToUpload = null;
              this.showcreate=false;
            }, 1000)
          }

        })
        .catch(err => console.log(err));
    }

    }

}
