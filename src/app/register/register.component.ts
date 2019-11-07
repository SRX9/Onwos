import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import { ActivatedRoute, Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  constructor(private router: Router,
    private route: ActivatedRoute,
    private message: NzMessageService) { }
  tempPhoto;
  fileToUpload: File = null;
  loading=false;
  Validate="";
  help="";

  ngOnInit() {
  }

  checkUser=(event)=>{
    this.Validate = "validating";
    axios.get('http://localhost:3001/searchUser?q=' + event.target.value)
      .then((response) => {
        if (!response.data) {
          this.Validate ="success"
          this.help="";
        } else {
          this.Validate = "error"
          this.help = "Username Already exists";
        }
      })
      .catch(function (error) {
        console.log(error);
    });
  }


  getProfilePhoto = (event) => {
    this.fileToUpload = event.target.files[0]
    var reader = new FileReader();
    reader.onload = () => {
      this.tempPhoto = reader.result
    };
    reader.readAsDataURL(event.target.files[0]);
  }

  register=(uname,pass,bio)=>{

    let bodyFormData = new FormData();
    if (this.fileToUpload === null) {
      this.message.create("warning", `Plz Select a Profile photo`);
    }
    else if (uname.trim() === "" || pass.trim() === '' || bio.trim() === '') {
      this.message.create("warning", `Plz fill all required information`);
    }
    else if(this.Validate==="error")
    {
      return null;
    }
    else {
      this.loading = true;
      bodyFormData.append('img', this.fileToUpload);
      bodyFormData.append('uname', uname);
      bodyFormData.append('bio', bio);
      bodyFormData.append('pass', pass);
      axios.put('http://localhost:3000/register', bodyFormData)
        .then(res => {
          if(res.data)
          {
            this.loading=false;
            localStorage.setItem('sxcvi', res.data.userid);
            this.router.navigateByUrl('/')
          }
          else{
            this.loading=false;
            this.message.create("warning", `Server Error Plz try again later`);
          }
        })
        .catch(err => console.log(err));
    }
  }

}
