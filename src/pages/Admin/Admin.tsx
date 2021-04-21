import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { GetMyProfile } from '../../store/Account/actions';
import Footer from './Components/Footer';
import LeftMenu from './Components/LefMenu';
import TopNavBar from './Components/TopNavbar';

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
                        {/* <Route exact path='/'>
                            <Home />
                        </Route>
                        <Route exact path='/product/:id' component={EditProduct}>
                        </Route> */}
                        <h1>Render SPA!</h1>
                    </div>
                </div>
                <Footer />
            </div>
        </BrowserRouter>
    )
}