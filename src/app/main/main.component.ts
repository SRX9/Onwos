import { Component ,OnInit, Input} from '@angular/core';
import axios from 'axios';
import { interval } from 'rxjs';
import { take } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent {
  searchResult=[]
  inputValue='';
  status='search'
  user;
  userObj;
  login=false;
  constructor(private router: Router,) { }
  ngOnInit(){

    if (localStorage.getItem("sxcv")!==null)
    {
      this.user = localStorage.getItem("sxcv");
      this.login=true;
      axios.get('http://localhost:3002/getProfileByName', {
        params: {
          uname: localStorage.getItem("sxcv")
        }
      }).then((response) => {

        this.userObj=response.data;
        localStorage.setItem('sxcvi',response.data.userid);
      });
    }
    const numbers = interval(1000);

    const takeFourNumbers = numbers.pipe(take(86400));

    takeFourNumbers.subscribe(x => {
      if (localStorage.getItem("sxcv") != null) {
        this.login = true;
        axios.get('http://localhost:3002/getProfileByName', {
          params: {
            uname: localStorage.getItem("sxcv")
          }
        }).then((response) => {
          localStorage.setItem('sxcvi', response.data.userid);
          this.userObj = response.data;
        });
      }
    });
  }
  logout=()=>{
    this.login=false;
    this.userObj=null;
    localStorage.removeItem("sxcv");
    localStorage.removeItem("sxcvi");
  }

  search=(event)=>{
    this.status ='loading';
    axios.get('http://localhost:3001/search', {
      params: {
        keyword: event.target.value
      }
    }).then((response) => {
      this.inputValue=''
      this.searchResult=response.data;
      setTimeout(()=>{
        this.status = 'search'
      },400)
    });
  }

  goToResult=(type,id)=>{
    if(type===1)
    {

      this.router.navigateByUrl('/user/'+id);
    }
    else{
      window.location.reload()
      this.router.navigateByUrl('/show/'+id)
    }
  }
}
