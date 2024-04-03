import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-error-page',
  standalone: true,
  imports: [],
  templateUrl: './error-page.component.html',
  styleUrl: './error-page.component.scss'
})
export class ErrorPageComponent implements OnInit {

 constructor(private routes : ActivatedRoute){}
msg=`message`;
code=404;

private setPage(errorCode:number){
  var status=[
    {code:400,title:"Bad request",msg:"Your browser send an invalid request."},
    {code:401,title:"Unauthorized",msg:"Sorry, you are not authorized to view this page."},
    {code:403,title:"Forbiden",msg:"Sorry, You dont have access to this page."},
    {code:404,title:"Page Not found",msg:"Sorry, we can't find that page!"}];

    var index=3;
    if (errorCode) {
      switch (errorCode)
      {
      case 400:
        index=0;
        break;
      case 401:
        index=1;
        break;
        case 403:
          index=2;
          break;
        default:
          index=3;
      }
      this.code=status[index].code;
      this.msg=status[index].msg;
    }else
    {
      this.msg=status[3].msg;
      this.code=status[3].code;
    }

}




  ngOnInit(): void {
    const index=Number(this.routes.snapshot.params['id']);
    this.setPage(index);
  }

}
