import { BrowserRouter, Route } from 'react-router-dom';
import Footer from './Components/Footer';
import LeftMenu from './Components/LefMenu';
import TopNavBar from './Components/TopNavbar';

export const Admin = () => {
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