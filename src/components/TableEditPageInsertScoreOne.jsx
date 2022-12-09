import React from 'react';
import { DataGrid } from '@mui/x-data-grid';

const columns = [
  {
    field: 'studyperiod',
    headerName: 'ระยะเวลาการศึกษา',
    width: 200,
    headerAlign: 'center',
    align: 'center',
  },
  {
    field: 'hoursofleave',
    headerName: 'จำนวนชั่วโมงลากิจ',
    width: 200,
    headerAlign: 'center',
    align: 'center'
  },
  {
    field: 'hoursofsickleave',
    headerName: 'จำนวนชั่วโมงลาป่วย',
    width: 180,
    headerAlign: 'center',
    align: 'center'
  },
  {
    field: 'totaltimestudy',
    headerName: 'รวมเวลามาเรียน',
    width: 180,
    headerAlign: 'center',
    align: 'center'
  },
  {
    field: 'percentagestudy',
    headerName: 'ร้อยละเวลามาเรียน',
    width: 180,
    headerAlign: 'center',
    align: 'center'
  },
  {
    field: 'conductscore',
    headerName: 'คะแนนความประพฤติ',
    width: 180,
    headerAlign: 'center',
    align: 'center'
  },
]

export default function TableEditPageInsertScoreOne(props) {
  const rows = [{
    id: 1,
    studyperiod: props.data.studyperiod,
    hoursofleave: props.data.hoursofleave,
    hoursofsickleave: props.data.hoursofsickleave,
    totaltimestudy: props.data.totaltimestudy,
    percentagestudy: props.data.percentagestudy,
    conductscore: props.data.conductscore
  }];
  return (
    <React.Fragment>
      <div style={{ height: 200, width: '1150px' }}>
        <DataGrid rows={rows} columns={columns} hideFooter={true} />
      </div>
    </React.Fragment>
  );
}
