
class DateComparator{

  constructor(utc){
      this.utc= utc;
       this.iso = new Date(this.utc);
       this.mil= Date.parse(this.iso);
    }

    getTime(){

      let h= this.iso.getHours();
      let m = this.iso.getMinutes();
      let d = 'AM'
      if(m.toString().length == 1 ){ m = "0"+m; }
      if(h>12){ d='PM'; h= h-12; }
      let obj= {h:h,m:m, string:h+":"+m+" "+d}

      return obj

    }

  compare(){

          let iso=this.iso;
          let mil= this.mil;

          let now= new Date();
          let now_mil = Date.parse(now);

          let isoDay= 86400000;
          let isoWeek= isoDay*7;
          let isoMonth= isoDay*30;
          let isoYear= isoDay*365;

          let dif = now_mil - mil ;

          let result=null;

          if(dif <= isoDay ){   let time= this.getTime(); result= 'Today @ '+ time.string;  }

          if(dif < 2 * isoDay && dif > isoDay){  let time= this.getTime(); result= 'Yesterday @ '+ time.string; }

          if( dif <= isoWeek && dif > 2*isoDay ){ let n= Math.round(dif/isoDay); result= n+' days ago';}

          if( dif >= isoWeek){ let n= Math.round(dif/isoDay); result= 'Last week';}

          if(dif >= 1.5*isoWeek){ let n= Math.round(dif/isoWeek); result= n+' weeks ago';}

          if( dif >= isoMonth ){ let n= Math.round(dif/isoMonth); result='1 month ago';}

          if( dif >= 1.5*(isoMonth) ){ let n= Math.round(dif/isoMonth); result= n+' months ago';}

          if( dif >= isoYear ){ let n= Math.round(dif/isoYear);  result=' a year ago'; }

          if( dif >= 1.5*(isoYear) ){ let n= Math.round(dif/isoYear);result= n+' years ago';}

          return result;

  }
}

export default DateComparator;
