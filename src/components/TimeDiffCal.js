/* eslint-disable default-case */
import moment from 'moment-timezone';

export class CalTimeSpan {
  constructor(s_date, s_time, e_date, e_time){
    this.totalLeaveHrsPerDay = 7;
    this.s_date = s_date;//moment(new Date(s_date)).format('YYYY-MM-DD');
    this.s_time = Number(s_time.split(':')[0]) + (Number(s_time.split(':')[1])/60);
    this.e_date = e_date;//moment(new Date(e_date)).format('YYYY-MM-DD');
    this.e_time = Number(e_time.split(':')[0]) + (Number(e_time.split(':')[1])/60);
    this.numdaysdiff = moment(this.e_date).diff(this.s_date, 'days');
    //console.log('test : >>> ', s_date, ' : ', s_time, ' : ',e_date, ' : ',e_time);
    //console.log('this.numdaysdiff : >>> ', this.numdaysdiff);
  }

  getTotalLeaveHrs() {
    let t_span = 0;
    switch(true){
      /*---------- same day --------*/
      case (this.numdaysdiff === 0) :
        switch (true) {
          case (this.s_time >= 8 && this.s_time <= 12) && (this.e_time >= 8 && this.e_time <= 12) :
            t_span = this.e_time - this.s_time;
            break;
          case (this.s_time >= 13 && this.s_time <= 16) && (this.e_time >= 13 && this.e_time <= 16) :
            t_span = this.e_time - this.s_time;
            break;
          case (this.s_time >= 8 && this.s_time <= 12) && (this.e_time >= 13 && this.e_time <= 16) :
            t_span = this.e_time - this.s_time - 1; // 1 - launch time
            break;
        }
        console.log(`${this.numdaysdiff} days different >> t_span = ${t_span}`);
        break;
      /*---------- end by next day --------*/
      case (this.numdaysdiff >= 1) :
        switch (true) {
          case (this.s_time >= 8 && this.s_time <= 12) && (this.e_time >= 8 && this.e_time <= 12) :
            t_span = (this.totalLeaveHrsPerDay * (this.numdaysdiff - 1)) + (15 - this.s_time) + (this.e_time - 8);
            break;
          case (this.s_time >= 8 && this.s_time <= 12) && (this.e_time >= 13 && this.e_time <= 16) :
            t_span = (this.totalLeaveHrsPerDay * (this.numdaysdiff - 1)) + (15 - this.s_time) + (this.e_time - 9);
            break;
          case (this.s_time >= 13 && this.s_time <= 16) && (this.e_time >= 8 && this.e_time <= 12) :
            t_span = (this.totalLeaveHrsPerDay * (this.numdaysdiff - 1)) + (16 - this.s_time) + (this.e_time - 8);
            break;
          case (this.s_time >= 13 && this.s_time <= 16) && (this.e_time >= 13 && this.e_time <= 16) :
            t_span = (this.totalLeaveHrsPerDay * (this.numdaysdiff - 1)) + (16 - this.s_time) + (this.e_time - 9);
            break;
        }
        console.log(`${this.numdaysdiff} days different >> t_span = ${t_span}`);
        break;
    }
    return t_span;
  }
};