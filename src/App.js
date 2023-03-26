import { Fragment } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { routes } from '~/config/routes';
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

function App() {
    return (
        <Router>
            <div className="App">
                <Routes>
                    {routes.map((route, index) => {
                        const Page = route.component;
                        let Layout = Fragment;
                        const Guard = route.guard ?? Fragment;

                        if (route.layout) {
                            Layout = route.layout;
                        } else if (route.layout === null) {
                            Layout = Fragment;
                        }

                        return (
                            <Route
                                key={index}
                                path={route.path}
                                element={
                                    <Guard>
                                        <Layout>
                                            <Page />
                                        </Layout>
                                    </Guard>
                                }
                            />
                        );
                    })}
                </Routes>
            </div>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </Router>
    );
}

export default App;
