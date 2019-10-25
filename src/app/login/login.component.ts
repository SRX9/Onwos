import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import { ActivatedRoute, Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
var on = '../../On.png';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  On=on;
  loading=false;
  constructor(private router: Router,
              private route: ActivatedRoute,
              private message: NzMessageService) { }

  ngOnInit() {
    this.On=on;
  }
  login=(uname,pass)=>
  {   this.loading=true;
      axios({
      method: "post",
      url: "http://localhost:3002/login",
      data: {
        uname:uname,
        password:pass
      }
      }).then((res) => {
        if(res.data)
        {
          localStorage.setItem('sxcv', uname);
          this.loading=false;
          this.router.navigateByUrl('/')
        }else{
          this.loading = false;
          this.message.create("error", `Invalid Credentials`);
        }
      });
  }

  getUrl() {
    return "https://www.cheatsheet.com/wp-content/uploads/2019/10/taylor-swift-1024x681.jpg";
  }
}
