import React from 'react';
import Sidebar from '../components/Sidebar';
import NavbarMain from '../components/NavbarMain';
import NavbarLogin from '../components/NavbarLogin';
import Footer from '../components/Footer';
import {useLocation} from 'react-router-dom';
// import PageSelectSchool from '../pages/PageSelectSchool';
import PageSelectSchools from '../pages/PageSelectSchools';
import PageLogin from '../pages/PageLogin';
import PageTeaCher from '../pages/PageRegisTeaCher';
import PageRegisStu from '../pages/PageRegisStu';
import PagePrintStudyResults from '../pages/PagePrintStudyResults.jsx'
import PagePrintStudyResultsOne from '../pages/PagePrintStudyResultsOne.jsx'
import PageAccessRights from '../pages/PageAccessRights'

const MainLayout = ({children}) => {
    const location = useLocation();
    if(location.pathname === "/"){
        return <PageLogin />
    }else if(location.pathname === "/RegisTeac"){
        return <PageTeaCher />
    }else if(location.pathname === "/RegisStu"){
        return <PageRegisStu />
    }else if(location.pathname === "/PagePrintStudyResults"){
        return(
            <React.Fragment>
                 <NavbarMain />
                 <div className="containerMainPage">
                 <Sidebar />
                <PagePrintStudyResults />
                </div>
            </React.Fragment>
        ) 
    }else if(location.pathname === "/PagePrintStudyResultsOne"){
        return(
            <React.Fragment>
                 <NavbarMain />
                 <div className="containerMainPage">
                 <Sidebar />
                <PagePrintStudyResultsOne />
                </div>
            </React.Fragment>
        ) 
    }else if(location.pathname === "/PageSelectSchools"){
        return (
            <React.Fragment>
                <NavbarLogin />
                <PageSelectSchools />
            </React.Fragment>
        ) 
    }else if(location.pathname === "/PageAccessRights"){
        return (
            <React.Fragment>
                <NavbarLogin />
                <PageAccessRights />
            </React.Fragment>
        ) 
    }
    else {
        return (
            <React.Fragment>
                <NavbarMain />
                <div className="containerMainPage">
                    <Sidebar />
                    {children}
                </div>
                <Footer />
            </React.Fragment>
        )
    }
}

export default MainLayout;