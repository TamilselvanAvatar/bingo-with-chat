import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Welcome from './Login/Mainpage'
import { Dashboard } from './Dashboard/dashboard'
import { UserProvider } from './helperComponent/UserContext'

export default () => {
    return (
        <BrowserRouter>
            <UserProvider>
                <Routes>
                    <Route path='/' element={<Welcome />} />
                    <Route path='/dashboard/:id' element={<Dashboard />} />
                </Routes>
            </UserProvider>
        </BrowserRouter>
    )
}