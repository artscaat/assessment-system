import React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { Link } from "react-router-dom";


export default function TablePrintStudyResultsTwo() {
  return(
<React.Fragment>
<div style={{ height: 400, width: '100%' }}>
  {/* TAble 1 */}
  <div className='ContainerTabless2'>
  <p className="HeadTextPrint">โรงเรียนนายทหารชั้นผู้บังคับหมวด กรมยุทธศึกษาทหารอากาศ</p>
  <p className="HeadTextPrint">รายงานผลการศึกษารายบุคคล</p>
  <p className="HeadTextPrint">หลักสูตร นายทหารชั้นผู้บังคับหมวด รุ่น 86 ประจำปีงบประมาณ 2561</p>
<p>ตอนที่ 1 ประวัติทั่วไป</p>
<table class="table table-bordered border-dark">
  <tbody >
    <tr>
      <th  rowspan="4"><p>ยศ-ชื่อ-สกุล <br /> จ.อ.อาทิตย์ แสนโคก </p></th>
      <th  colspan="4"><p>เลขประจำตัว 0000</p></th>
    </tr>
    <tr >
      <td><p>เหล่าทหาร</p></td>
      <td colspan="4"><p>จำพวกทหาร</p></td>
    </tr>
    <tr>
      <td><p>ลชทอ.</p></td>
      <td colspan="4"><p>ตำแหน่ง</p></td>
    </tr>
    <tr>
      <td colspan="4"><p>ลชทอ.</p></td>
    </tr>
  </tbody>
  <tbody >
    <tr>
      <th  rowspan="4"><p>ระยะเวลาการศึกษา<br />13 สัปดาห์ ตั้งแต่ 27 ต.ค.63 - 29 ม.ค.64 </p></th>
      <th  colspan="4"><p>ชั่วโมงการศึกษา</p></th>
    </tr>
    <tr >
      <td><p>ตามหลักสูตร</p></td>
      <td><p>ลากิจ</p></td>
      <td><p>ลาป่วย</p></td>
      <td><p>เวลาศึกษาคิดเป็นร้อยละ</p></td>
    </tr>
    <tr>
      <td><p>500 ชั่วโมง</p></td>
      <td><p>-</p></td>
      <td><p>8</p></td>
      <td><p>98.40</p></td>
    </tr>
  </tbody>
</table>
{/* TAble 2 */}

<p>ตอนที่ 2 ผลประเมินความรู้ความสามารถ</p>
<table class="table table-bordered border-dark">
<thead>
    <tr>
      <th scope="col">ชื่อหมวดวิชา</th>
      <th scope="col">น้ำหนักคะแนน/หน่วยกิต</th>
      <th scope="col">ระดับคะแนนที่ได้</th>
      <th scope="col">ค่าระดับคะแนน</th>
      <th scope="col">ผลการประเมิน</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>หมวดวิชา 1 พื้นฐานของผู้นำและผู้บังคับบัญชา</th>
      <td>100</td>
      <td>88.88</td>
      <td>88.88</td>
      <td>ดีมาก</td>
    </tr>
    <tr>
      <th>หมวดวิชา 2 การทหารและกิจการกองทัพอากาศ</th>
      <td>100</td>
      <td>88.88</td>
      <td>88.88</td>
      <td>ดีมาก</td>
    </tr>
    <tr>
      <th>หมวดวิชา 3 การฝึกความเป็นผู้นำทางการทหาร</th>
      <td>100</td>
      <td>88.88</td>
      <td>88.88</td>
      <td>ดีมาก</td>
    </tr>
    <tr>
      <th>หมวดวิชา 4 กิจกรรมและวิชาเสริมหลังสูตร</th>
      <td>100</td>
      <td>88.88</td>
      <td>88.88</td>
      <td>ดีมาก</td>
    </tr>
    <tr>
      <td colspan="2"><p>เฉลี่ยตลอดหลักสูตร</p></td>
      <td>3.54</td>
      <td></td>
      <td>ดีมาก</td>
    </tr>
  </tbody>
  
</table>
<div className='ContainerTableStudy'>
    {/* TAble 3 */}
<div className='ContainerTable1'>
    <p>ตอนที่ 3 ผลการประเมินค่าคุณลักษณะส่วนบุคคล</p>
        <table class="table table-bordered border-dark">
        <thead>
            <tr>
              <th scope="col">คุณลักษณะส่วนบุคคล</th>
              <th scope="col">คะแนนเต็ม</th>
              <th scope="col">คะแนนที่ได้</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>ด้านที่ 1 ความวิริยะอุตสาหะ</th>
              <td>4</td>
              <td>3.95</td>
            </tr>
            <tr>
              <th>ด้านที่ 2 วินัย</th>
              <td>4</td>
              <td>3.75</td>
            </tr>
            <tr>
              <th>ด้านที่ 3 ความประพฤติ</th>
              <td>5</td>
              <td>3.80</td>
            </tr>
            <tr>
              <th>ด้านที่ 4 บุคลิกลักษณะ</th>
              <td>4</td>
              <td>3.50</td>
            </tr>
            <tr>
              <th>ด้านที่ 5 นิสัยและอุปนิสัย</th>
              <td>4</td>
              <td>3.50</td>
            </tr>
            <tr>
              <th>ด้านที่ 6 การสังคม</th>
              <td>4</td>
              <td>3.50</td>
            </tr>
            <tr>
              <th>ด้านที่ 7 ความเป็นผู้นำ</th>
              <td>4</td>
              <td>3.50</td>
            </tr>
            <tr>
              <th>ด้านที่ 8 เชาว์ริเริ่ม</th>
              <td>4</td>
              <td>3.50</td>
            </tr>
            <tr>
              <th>ด้านที่ 9 การปฏิบัติงาน</th>
              <td>4</td>
              <td>3.50</td>
            </tr>
            <tr>
              <th>ด้านที่ 10 ดุลยพินิจ</th>
              <td>4</td>
              <td>3.50</td>
            </tr>
            <tr>
              <th colspan="2">เฉลี่ยตลอดหลักสูตร</th>
              <td>3.60</td>
            </tr>
            <tr>
              <th colspan="2">ผลการประเมิน</th>
              <td>ดีมาก</td>
            </tr>
          </tbody>
        </table>
</div>
<div className='ContainerTable1'>
    <p>ตอนที่ 4 ผลการประเมินค่าคุณลักษณะส่วนบุคคล</p>
      <div className='ContainerCommentStu'>
          <p>ผลการศึกษา สำเร็จการศึกษา</p>
          <p>สอบได้ลำดับที่ 7 ประเภท ก</p>
          <p>จำนวนผู้เข้ารับการศึกษา 119 คน</p>
      </div>
      <p>ตอนที่ 5 ความคิดเห็นผู้บังคับบัญชา</p>
   
          <TextField id="outlined-multiline-static" label="ความคิดเห็นของผู้บังคับบัญชา" multiline rows={4} sx={{width: '100%'}} />  
</div>
</div>
</div>
<div className='ContainerTabless2'>


<p className='TextTabless2'>เกณฑ์</p>
<div className='ContainerTableS2'>
<div className='ContainerTable2'>
<p>เกณฑ์การประเมินความรู้ความสามารถ (การประเมินแบบเกรด)</p>
        <table class="table table-bordered border-dark">
        <thead>
            <tr>
              <th scope="col">คะแนนรวมร้อยละ</th>
              <th scope="col">เกณฑ์ความรู้ความสามารถ</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>3.50 - 4.00</th>
              <td>ดีมาก</td>
            </tr>
            <tr>
              <th>3.00 - 3.49</th>
              <td>ดี</td>
            </tr>
            <tr>
              <th>2.50 - 2.99</th>
              <td>ปานกลาง</td>
            </tr>
            <tr>
              <th>2.00 - 2.49</th>
              <td>พอใช้</td>
            </tr>
            <tr>
              <th>ต่ำกว่า 2.00</th>
              <td>ไม่ผ่านเกณฑ์</td>
            </tr>
          </tbody>
        </table>
</div>
<div className='ContainerTable2'>
<p>เกณฑ์การประเมินค่าคุณลักษณะส่วนบุคคล</p>
        <table class="table table-bordered border-dark">
        <thead>
            <tr>
              <th scope="col">คะแนนรวมร้อยละ</th>
              <th scope="col">เกณฑ์ความรู้ความสามารถ</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>3.50 - 4.00</th>
              <td>ดีมาก</td>
            </tr>
            <tr>
              <th>3.00 - 3.49</th>
              <td>ดี</td>
            </tr>
            <tr>
              <th>2.50 - 2.99</th>
              <td>ปานกลาง</td>
            </tr>
            <tr>
              <th>2.00 - 2.49</th>
              <td>พอใช้</td>
            </tr>
            <tr>
              <th>ต่ำกว่า 2.00</th>
              <td>ไม่ผ่านเกณฑ์</td>
            </tr>
          </tbody>
        </table>
</div>
</div>

</div>

<div className='containerBtnStudyResults'>
    <Link to="/PageStudyResults"><Button variant="outlined" sx={{minWidth: 300, m:1  }}>ย้อนกลับ</Button></Link>
</div>
   


    </div>
    
</React.Fragment>
  );
}
