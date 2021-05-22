import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Router, Route, Switch } from 'react-router-dom';
import { GetMyProfile } from '../../store/Account/actions';
import { NotFound } from '../Account';
import LeftMenu from './Components/LefMenu';
import TopNavBar from './Components/TopNavbar';
import EditProfile from './Profile/EditProfile';
import ViewProfile from './Profile/ViewProfile';
import { history } from '../../helpers';
import { ListUser } from './Users/ListUser';
import { ListTrackTypes } from './TrackTypes/ListTrackTypes';
import { AddTrackType } from './TrackTypes/AddTrackType';
import { EditTrackType } from './TrackTypes/EditTrackType';
import { ListTrack } from './Tracks/ListTrack';
import { ListSinger } from './Singers/ListSinger';
import { AddSinger } from './Singers/AddSinger';
import { EditSinger } from './Singers/EditSinger';
import { AddTrack } from './Tracks/AddTrack';

export const Admin = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(GetMyProfile());
    }, [dispatch]);
    return (
        <Router history={history}>
            <LeftMenu />
            <div id="content-wrapper" className="d-flex flex-column">
                <div id="content">
                    <TopNavBar/>
                    <div className="container-fluid">
                        <Switch>
                            <Route exact path='/' component={ListUser} />
                            <Route exact path='/singer' component={ListSinger} />
                            <Route exact path='/singer/create' component={AddSinger} />
                            <Route exact path='/singer/edit/:id' component={EditSinger} />
                            <Route exact path='/track-types' component={ListTrackTypes} />
                            <Route exact path='/add-tracktype' component={AddTrackType} />
                            <Route exact path='/edit-tracktype/:id' component={EditTrackType} />
                            <Route exact path='/list-track/limit=:limit&page=:page' component={ListTrack} />
                            <Route exact path='/add-track' component={AddTrack} />
                            <Route exact path='/my-profile' component={ViewProfile} />
                            <Route exact path='/update-profile' component={EditProfile} />/
                            <Route component={NotFound} />
                        </Switch>
                    </div>
                </div>
                {/* <Footer /> */}
            </div>
        </Router>
    )
}