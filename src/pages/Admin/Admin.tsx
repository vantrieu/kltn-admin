import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { GetMyProfile } from '../../store/Account/actions';
import { NotFound } from '../Account';
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
                        <Switch>
                            <Route exact path='/my-profile' component={ViewProfile} />
                            <Route exact path='/update-profile' component={EditProfile} />/
                            <Route component={NotFound} />
                        </Switch>
                    </div>
                </div>
                <Footer />
            </div>
        </BrowserRouter>
    )
}