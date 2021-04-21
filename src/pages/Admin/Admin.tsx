import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';
import { GetMyProfile } from '../../store/Account/actions';
import Footer from './Components/Footer';
import LeftMenu from './Components/LefMenu';
import TopNavBar from './Components/TopNavbar';
import EditProfile from './Profile/EditProfile';
import ViewProfile from './Profile/ViewProfile';

export const Admin = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(GetMyProfile());
    }, [dispatch]);
    return (
        <BrowserRouter>
            <LeftMenu />
            <div id="content-wrapper" className="d-flex flex-column">
                <div id="content">
                    <TopNavBar />
                    <div className="container-fluid">
                        <Route exact path='/my-profile'>
                            <ViewProfile />
                        </Route>
                        <Route exact path='/update-profile'>
                            <EditProfile />
                        </Route>
                        {/* <Route exact path='/profile/:id' component={EditProduct}>
                        </Route> */}
                        {/* <Route exact={true} path=''>
                            <NotFound />
                        </Route> */}
                    </div>
                </div>
                <Footer />
            </div>
        </BrowserRouter>
    )
}