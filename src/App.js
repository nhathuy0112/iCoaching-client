import { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { routes } from '~/config/routes';
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from 'react-redux';
import { updateUserOnlineStatus } from './features/chatSlice';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { db } from './firebase';
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';
import { ZIM } from 'zego-zim-web';

function App() {
    const { currentUser } = useSelector((state) => state.user);
    const dispatch = useDispatch();
    var isPageVisible = true;

    useEffect(() => {
        if (currentUser) {
            init();
        }
    });
    async function init() {
        let zp;
        const userID = currentUser?.Username;
        const userName = currentUser?.Fullname;
        const { token } = await generateToken('https://node-express-vercel-master-one.vercel.app', userID);
        const KitToken = ZegoUIKitPrebuilt.generateKitTokenForProduction(1980920521, token, null, userID, userName);
        zp = ZegoUIKitPrebuilt.create(KitToken);
        zp.addPlugins({ ZIM });
    }
    function generateToken(tokenServerUrl, userID) {
        return fetch(`${tokenServerUrl}/api/userID/${userID}`, {
            method: 'GET',
        }).then((res) => res.json());
    }
    useEffect(() => {
        if (currentUser) {
            registerUser(currentUser);
        }
    }, [currentUser]);

    const registerUser = async (userToken) => {
        try {
            await setDoc(doc(db, 'users', userToken?.Id), {
                uid: userToken?.Id,
                username: userToken?.Username,
                email: userToken?.email,
                avatar: userToken?.Avatar,
                isOnline: true,
                fullname: userToken?.Fullname,
            });
            const userChatsRef = doc(db, 'userChats', userToken?.Id);
            const userChatsDoc = await getDoc(userChatsRef);
            if (!userChatsDoc.exists()) {
                await setDoc(userChatsRef, {});
            }
        } catch (error) {
            console.error('Error registering user:', error);
            throw error;
        }
    };

    useEffect(() => {
        if (currentUser) {
            const updateUserAvatar = async () => {
                try {
                    const userDocRef = doc(db, 'users', currentUser.Id);
                    await updateDoc(userDocRef, {
                        avatar: currentUser?.Avatar,
                        isOnline: true,
                    });
                } catch (error) {
                    console.error('Error updating user email:', error);
                    throw error;
                }
            };
            updateUserAvatar();
        }
    }, [currentUser?.Avatar, currentUser]);

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('unload', handleUnload);

    function handleVisibilityChange() {
        isPageVisible = !document.hidden;
    }

    function handleUnload() {
        if (!isPageVisible) {
            dispatch(updateUserOnlineStatus(currentUser?.Id));
        }
    }
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
