const moment = require('moment-timezone');

export default class CalTimeSpan {
  constructor(s_date, s_time, e_date, e_time){
    // console.log('s_date ', s_date);
    // console.log('s_time ', s_time);
    // console.log('e_date ', e_date);
    // console.log('e_time ', e_time);
    // this.totalLeaveHrsPerDay = 7;
    this.s_date = moment(new Date(s_date)).format('YYYY-MM-DD');
    // console.log('s_date ', this.s_date);
    this.s_time = Number(s_time.split(':')[0]);
    // console.log('s_time ', this.s_time);
    this.e_date = moment(new Date(e_date)).format('YYYY-MM-DD');
    // console.log('e_date ', this.e_date);
    this.e_time = Number(e_time.split(':')[0]);
    // console.log('e_time ', this.e_time);
    this.numdaysdiff = moment(this.e_date).diff(this.s_date, 'days');
    // console.log('numdaysdiff ', this.numdaysdiff);
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
          default :
            t_span = this.e_time - this.s_time - 1; // 1 - launch time
            break;
        }
        console.log('same day >> t_span ', t_span);
        break;
      /*---------- end by next day --------*/
      case (this.numdaysdiff >= 1) :
        switch (true) {
          case (this.s_time >= 8 && this.s_time <= 12) && (this.e_time >= 8 && this.e_time <= 12) :
            t_span = (7 * (this.numdaysdiff - 1)) + (15 - this.s_time) + (this.e_time - 8);
            break;
          case (this.s_time >= 8 && this.s_time <= 12) && (this.e_time >= 13 && this.e_time <= 16) :
            t_span = (7 * (this.numdaysdiff - 1)) + (15 - this.s_time) + (this.e_time - 9);
            break;
          case (this.s_time >= 13 && this.s_time <= 16) && (this.e_time >= 8 && this.e_time <= 12) :
            t_span = (7 * (this.numdaysdiff - 1)) + (16 - this.s_time) + (this.e_time - 8);
            break;
          case (this.s_time >= 13 && this.s_time <= 16) && (this.e_time >= 13 && this.e_time <= 16) :
            t_span = (7 * (this.numdaysdiff - 1)) + (16 - this.s_time) + (this.e_time - 9);
            break;
        }
        console.log(`${this.numdaysdiff} days different >> t_span = ${t_span}`);
        break;
    }
    return t_span;
  }
};

const calTimeSpan1 = new CalTimeSpan('08/11/2022', '08:00', '08/13/2022', '16:00');
      calTimeSpan1.getTotalLeaveHrs();
// const calTimeSpan2 = new CalTimeSpan('06/08/2022', '09:00', '06/11/2022', '15:00');
//       calTimeSpan2.getTotalLeaveHrs();
// const calTimeSpan3 = new CalTimeSpan('06/08/2022', '13:00', '06/11/2022', '09:00');
//       calTimeSpan3.getTotalLeaveHrs();
// const calTimeSpan4 = new CalTimeSpan('06/08/2022', '14:00', '06/11/2022', '15:00');
//       calTimeSpan4.getTotalLeaveHrs();
