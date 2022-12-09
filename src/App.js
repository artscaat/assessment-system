import React from 'react';
import PageLogin from './pages/PageLogin'
import PageRegisStu from './pages/PageRegisStu'
import PageTeaCher from './pages/PageRegisTeaCher'
import PageHistory from './pages/PageHistory'
import PageHistoyrS from './pages/PageHistoyrS'
import PageInsertScore from './pages/PageInsertScore.jsx'
import PageEstimate from './pages/PageEstimate.jsx'
import PageAttribute from './pages/PageAttribute.jsx'
import PageSummarize from './pages/PageSummarize'
import PageStudyResults from './pages/PageStudyResults.jsx'
import PageEducationInfo from './pages/PageEducationInfo.jsx'
import PageSubject from './pages/PageSubject.jsx'
import PagePersonalAttributes from './pages/PagePersonalAttributes.jsx'
import PageListTeacher from './pages/PageListTeacher.jsx'
import PageManage from './pages/PageManage.jsx'
import PageAddEducationInfo from './pages/PageAddEducationInfo'
import PageEditEducationInfo from './pages/PageEditEducationInfo'
import PagePrintHistoyrs from './pages/PagePrintHistoyrs'
import PageEditInsertScore from './pages/PageEditInsertScore'
import PageEditLeaveHistory from './pages/PageEditLeaveHistory'
import PageEditHistoryS from './pages/PageEditHistoryS'
import PageEditAttribute from './pages/PageEditAttribute'
import PageEditSummarize from './pages/PageEditSummarize'
import PageAddSubject from './pages/PageAddSubject'
import PageEditSubject from './pages/PageEditSubject'
import PageAddPersonalAttributes from './pages/PageAddPersonalAttributes'
import PageEditPersonalAttributes from './pages/PageEditPersonalAttributes'
import PagePrintStudyResults from './pages/PagePrintStudyResults.jsx'
import PagePrintStudyResultsOne from './pages/PagePrintStudyResultsOne'
import PageEditListTeacher from './pages/PageEditListTeacher'
import PageSelectSchools from './pages/PageSelectSchools'
import PageAccessRights from './pages/PageAccessRights'
import PageUpdateAndRecordLeave from './pages/PageUpdateAndRecordLeave.jsx'
import PageEducationStatus from './pages/PageEducationStatus'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import MainLayout from '../src/components/LayoutPage'

// Notify
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function App() {
  return (
    <Router>
      <ToastContainer />
      <MainLayout>
        <Routes>
          {/* <Route path='/' element={<PageSelectSchool/>} /> */}
          <Route path="/PageSelectSchools" element={<PageSelectSchools />} />
          <Route path="/PageAccessRights" element={<PageAccessRights />} />
          <Route path="/PageEducationInfo" element={<PageEducationInfo />} />
          <Route path="/PageHistory" element={<PageHistory />} />
          <Route path="/PageHistoyrS" element={<PageHistoyrS />} />
          <Route path="/PageInsertScore" element={<PageInsertScore />} />
          <Route path="/PageEstimate" element={<PageEstimate />} />
          {/* <Route path='/PageAttribute' element={<PageAttribute/>} /> */}
          <Route path="/PageAttribute">
            <Route path="" element={<PageAttribute />} />
            <Route
              path=":backcoursegrp/:backseminar"
              element={<PageAttribute />}
            />
          </Route>
          <Route path="/PageSummarize" element={<PageSummarize />} />
          <Route path="/PageStudyResults" element={<PageStudyResults />} />
          <Route path="/PageSubject" element={<PageSubject />} />
          <Route
            path="/PagePersonalAttributes"
            element={<PagePersonalAttributes />}
          />
          <Route path="/PageListTeacher" element={<PageListTeacher />} />
          <Route path="/PageManage" element={<PageManage />} />
          <Route
            path="/PageAddEducationInfo"
            element={<PageAddEducationInfo />}
          />
          <Route
            path="/PageEditEducationInfo"
            element={<PageEditEducationInfo />}
          />
          <Route path="/PagePrintHistoyrs" element={<PagePrintHistoyrs />} />
          <Route
            path="/PageEditInsertScore"
            element={<PageEditInsertScore />}
          />
          <Route
            path="/PageEditLeaveHistory"
            element={<PageEditLeaveHistory />}
          />
          <Route path="/PageEditHistoryS/:id" element={<PageEditHistoryS />} />
          <Route path="/PageEditAttribute" element={<PageEditAttribute />} />
          {/* <Route path='/PageEditSummarize' element={<PageEditSummarize/>} /> */}
          <Route
            path="/PageEditSummarize/:PersId"
            element={<PageEditSummarize />}
          />
          <Route path="/PageAddSubject" element={<PageAddSubject />} />
          <Route path="/PageEditSubject" element={<PageEditSubject />} />
          <Route
            path="/PageAddPersonalAttributes"
            element={<PageAddPersonalAttributes />}
          />
          <Route
            path="/PageEditPersonalAttributes"
            element={<PageEditPersonalAttributes />}
          />
          {/* <Route path='/PagePrintStudyResults' element={<PagePrintStudyResults/>} />
        <Route path='/PagePrintStudyResultsOne' element={<PagePrintStudyResultsOne/>} /> */}
          <Route
            path="/PagePrintStudyResults"
            element={<PagePrintStudyResults />}
          />
          <Route
            path="/PagePrintStudyResultsOne"
            element={<PagePrintStudyResultsOne />}
          />
          <Route path="/" element={<PageLogin />} />
          <Route path="/RegisStu" element={<PageRegisStu />} />
          <Route path="/RegisTeac" element={<PageTeaCher />} />
          <Route
            path="/PageEditListTeacher"
            element={<PageEditListTeacher />}
          />
          <Route
            path="/PageUpdateAndRecordLeave"
            element={<PageUpdateAndRecordLeave />}
          />
          <Route
            path="/PageEducationStatus"
            element={<PageEducationStatus />}
          />
        </Routes>
      </MainLayout>
    </Router>
  )
}

export default App
