import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { ToastContainer, toast, Zoom } from 'react-toastify'
import { useLocation } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css'

export default function NavbarLogin() {
  // const AccessRights = localStorage.getItem('AccessRights')
  const location = useLocation()
  const [confirm, setComfirm] = useState(false)
  // const Access = localStorage.getItem('Access')
  // const AllAccessRights = localStorage.getItem('AllAccessRights')
  // const [allAccessRights , setAllAccessRights] = useState(JSON.parse(AllAccessRights))
  const navigate = useNavigate()
  var delayInMilliseconds = 3000
  const logout = () => {
    setComfirm(true)
    toast.success('ระบบจะออกในอีก3วิ')
    setTimeout(function () {
      localStorage.clear()
      navigate('/')
    }, delayInMilliseconds)
  }

  return (
    <React.Fragment>
      {confirm ? (
        <ToastContainer draggable={false} transition={Zoom} autoClose={3000} />
      ) : (
        <></>
      )}
      <div className="topbar">
        <div className="topbarWraper">
          <div className="topLeft">
            <span className="TextNavMain">
              ระบบสารสนเทศเพื่อการวัดและประเมินผลการศึกษา
            </span>
          </div>
          <div className="topRight">
            {/* <div className="NameUses">
                            <span className="NameUse">{Rank} {PersFname} {PersLname}</span>
                            <span className="NameUse">{Access}</span>
                        </div> */}

            <div className="topbarBtnContainer">
              {/* <Link to="/login" variant="body2">  
                            <button  className="btnLogout" type="submit">Logout</button>
                        </Link> */}
              {location.pathname === '/PageSelectSchools' ? (
                ''
              ) : (
                <Link to="/PageSelectSchools" variant="body2">
                  <button className="btnHome" type="submit">
                    กลับหน้าเลือกหลักสูตร
                  </button>
                </Link>
              )}
              {/* <Link to="/PageSelectSchools" variant="body2">  
                             <button  className="btnHome" type="submit">กลับหน้าเลือกหลักสูตร</button>
                         </Link> */}

              <button
                className="btnLogout"
                type="submit"
                onClick={() => logout()}
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}
