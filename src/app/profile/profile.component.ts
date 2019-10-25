import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import axios from 'axios';
import { NzMessageService } from 'ng-zorro-antd/message';
import { interval } from 'rxjs';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  listOfOption = [
    { label: "Drama", value: "Drama" },
    { label: "Thriller", value: "Thriller" },
    { label: "Alternate History", value:"Alternate History" },
    { label: "Comedy", value: "Comedy" },
    { label: "Suspense", value: "Suspense"},
    { label: "Science Fantasy",value:"Science Fantasy" },
    { label: "Procedural",value:"Procedural"},
    { label: "Detective Fiction",value:"Detective Fiction" },
    { label: "Adventure",value:"Adventure" },
    { label: "Lega Drama",value:"Lega Drama" },
    { label: "Talk Show",value:"Talk Show" },
    { label: "Sit-Com",value:"Sit-Com" },
    { label: "Education",value:"Education" },
    { label: "Information", value: "Information" },
    { label: "Technology", value: "Technology" },
    { label: "News", value: "News" },
    { label: "Music", value: "Music" },
    { label: "Reality Show", value: "Reality Show" },
    { label: "Romance", value: "Romance" },
    { label: "Mystery", value: "Mystery" },
    { label: "Action Fiction", value: "Action Fiction" },
    { label: "Superhero", value: "Superhero" },
    { label: "Kids", value: "Kids" },
    { label: "Animation", value: "Animation" },
    { label: "Action", value: "Action" },
    { label: "Fantasy", value: "Fantasy" },
    { label: "Historical", value: "Historical" },
    { label: "Horror", value: "Horror" },
    { label: "Philosophical", value: "Philosophical" },
    { label: "Political", value: "Political" },
    { label: "Science Fiction", value: "Science Fiction" },
    { label: "Social", value: "Social" }
  ];
  listOfSelectedValue=[]
  listOfArtist=[]
  listOfProducer=[]
  listOfDirector=[]
  listOfWriter=[]
  release;

  fan=false;
  fans=0;
  homeuser=false;

  userObj;
  userShowObjArr;
  tempPhoto;
  fileToUpload: File = null;
  userid = this.route.snapshot.params['userid'];
  oldPhoto;
  startUpdate=false;
  updated=false;
  percentup=0;


  createPhoto:any ="http://cdn.shoplightspeed.com/shops/603282/themes/3641/assets/placeholder-image.png?20190703175014"


  ngOnInit() {
    if (localStorage.getItem("sxcvi") === this.route.snapshot.params['userid']) {
      this.homeuser = true;
    }
    const numbers = interval(1000);

    const takeFourNumbers = numbers.pipe(take(86400));

    takeFourNumbers.subscribe(x => {
      if (this.route.snapshot.params['userid']!==this.userObj.userid)
      {
        axios.get('http://localhost:3002/getProfile', {
          params: {
            userid: this.route.snapshot.params['userid']
          }
        }).then((response) => {
          this.userObj = response.data;
          this.fans = response.data.fans;
          this.tempPhoto = "http://localhost:3000" + response.data.photo.toString();
          this.oldPhoto = "http://localhost:3000" + response.data.photo.toString();
        })
          .catch((error) => {
            console.log(error);
          });
      }
      if (localStorage.getItem("sxcvi") === this.route.snapshot.params['userid']) {
        this.homeuser = true;
      }
      else{
        this.homeuser=false;
      }
    });

  }
  constructor(private router: Router,private route: ActivatedRoute, private message: NzMessageService) {
    axios.get('http://localhost:3002/getProfile', {
      params: {
        userid: this.route.snapshot.params['userid']
      }
    }).then((response) => {
      this.userObj = response.data;
      this.fans=response.data.fans;
      this.tempPhoto = "http://localhost:3000"+response.data.photo.toString();
      this.oldPhoto = "http://localhost:3000" + response.data.photo.toString();
    })
      .catch((error) => {
        console.log(error);
      });

    axios.get('http://localhost:3002/getProfileShow', {
      params: {
        userid: this.route.snapshot.params['userid']
      }
    }).then((response) => {
      this.userShowObjArr = response.data;
    })
      .catch((error) => {
        console.log(error);
      });
  }

  isVisibleMiddle = false;
  visibleCreate=false;
  showModalMiddle(): void {
    this.isVisibleMiddle = true;
  }
  handleCancelMiddle(): void {
    this.isVisibleMiddle = false;
    if(!this.updated)
    {
      this.tempPhoto=this.oldPhoto;
    }
  }
  handleOkMiddle(): void {
    console.log('click ok');
    this.isVisibleMiddle = false;
  }

  showCreate=()=>{
    this.visibleCreate=true;
  }
  cancelCreate=()=>{
    this.visibleCreate=false;
  }
  okCreate=()=>{
    this.visibleCreate=false;
  }

  addFan=()=>{
    if (localStorage.getItem('sxcvi') === null) {
      this.router.navigateByUrl('/login')
    }
    else{
      if(this.fan)
      {
        this.fan=false;
        this.fans = this.fans - 1;
        axios.get('http://localhost:3002/removeFan', {
          params: {
            fanid: localStorage.getItem('sxcvi'),
            userid: this.userObj.userid
          }
        }).then((response) => {
          this.fan = false;
        });
      }
      else{
        this.fan = true;
          axios.get('http://localhost:3002/addFan', {
            params: {
              fanid: localStorage.getItem('sxcvi'),
              userid: this.userObj.userid
            }
          }).then((response) => {
            this.fan = true;
            this.fans=this.fans+1;
          });

    }
  }
  }

  getNewPhoto=(event)=> {
    this.fileToUpload = event.target.files[0]
    var reader = new FileReader();
    reader.onload =()=> {
      this.tempPhoto = reader.result
    };
    reader.readAsDataURL(event.target.files[0]);
  }
  changeProfile = (uname,bio) => {
    this.startUpdate=true;
    let bodyFormData = new FormData();

    const config = {
      onUploadProgress: (progressEvent)=> {
        var percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
        this.percentup= percentCompleted;
      }
    }
    if(uname.trim()==="")
    {
      uname=this.userObj.uname;
    }
    if(bio.trim()==="")
    {
      bio=this.userObj.bio;
    }
    let tempobj=this.userObj;
    tempobj.uname=uname;
    tempobj.bio=bio;
    tempobj.photo=this.tempPhoto
    this.userObj=tempobj;
    var temp = this.userShowObjArr
    for (let i = 0; i < this.userShowObjArr.length; i++) {
      temp[i].profile = this.tempPhoto;
    }
    this.userShowObjArr = temp;

    bodyFormData.append('img',this.fileToUpload);
    bodyFormData.append('uname', uname);
    bodyFormData.append('bio', bio);
    bodyFormData.append('userid', this.userid);
    axios.put('http://localhost:3000/changeUserProfile', bodyFormData, config)
      .then(res => {
        let tempobj = this.userObj;
        tempobj.uname = uname;
        tempobj.bio = bio;
        tempobj.photo = this.tempPhoto
        this.userObj = tempobj;
        var temp = this.userShowObjArr
        if (res.data.photo !== undefined) {
        for (let i = 0; i < this.userShowObjArr.length; i++) {
          temp[i].profile = this.tempPhoto;

        }
          this.userShowObjArr = temp;
        }
        if(this.percentup===100)
        {
          this.startUpdate=false;
          this.updated = true;
          setTimeout(()=>{
            this.updated = false;
            this.percentup=0;
            this.fileToUpload=null;
            this.isVisibleMiddle=false;
          },2000)
        }
      })
      .catch(err => console.log(err));
  }

  getCreatePhoto=(event)=>{
    this.fileToUpload = event.target.files[0]
    var reader = new FileReader();
    reader.onload = () => {
      this.createPhoto = reader.result
    };
    reader.readAsDataURL(event.target.files[0]);
  }
  createShow = (title,des) => {
    if(this.fileToUpload===null)
    {
      this.message.create("warning", `Plz Upload a Poster of the Show`);
    }
    else if(title.trim()==="" ||
            des.trim()==="" ||
            this.listOfArtist.length===0 ||
            this.listOfDirector.length===0 ||
            this.listOfSelectedValue.length===0||
            this.listOfProducer.length===0||
            this.listOfWriter.length===0)
    {
      this.message.create("warning", `Plz Fill All The Information`);
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
      bodyFormData.append('userid', this.userid);
      bodyFormData.append('uname', this.userObj.uname);
      bodyFormData.append('title', title);
      bodyFormData.append('description', des);
      bodyFormData.append('genre', JSON.stringify(this.listOfSelectedValue));
      bodyFormData.append('artist', JSON.stringify(this.listOfArtist));
      bodyFormData.append('director', JSON.stringify(this.listOfDirector));
      bodyFormData.append('producer', JSON.stringify(this.listOfProducer));
      bodyFormData.append('writer', JSON.stringify(this.listOfWriter));
      axios.put('http://localhost:3000/createShow', bodyFormData, config)
        .then(res => {
          if (res.data) {
            let temp = this.userShowObjArr;
            temp.unshift(res.data);
            this.userShowObjArr = temp;
            this.startUpdate = false;
            this.updated = true;
            setTimeout(() => {
              this.updated = false;
              this.percentup = 0;
              this.fileToUpload = null;
              this.visibleCreate = false;
            }, 2000)

          }
          else{
            this.message.create("warning", `Show With that title already Exists`);
            this.startUpdate = false;
          }
        })
        .catch(err => console.log(err));
    }

  }


}
