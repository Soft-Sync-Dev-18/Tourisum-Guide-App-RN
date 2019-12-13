import React from 'react'
import { Router, Stack, Scene } from 'react-native-router-flux'
import Login from './src/Component/SignIn/LogIn'
import SignUp from './src/Component/SignUp/SignUp'
import FooterTabs from './src/Component/FooterNavBAr/Footer'
import SelectPalce from './src/Component/UserPages/SelectPLace'
import FilterComponent from './src/Component/UserPages/Filter'
import HomePage from './src/Component/UserPages/homePage'
import UserVisitHistory from './src/Component/UserPages/UserHistory'

class AppRouter extends React.Component {
    render() {
        return (
            <Router>
                <Stack hideNavBar={true} navigationBarStyle={{ backgroundColor: "transparent" }} key="root">
                    <Scene
                        key="login" component={Login} title="Login" />
                    <Scene key="register" component={SignUp} title="Register" />
                    <Scene key="Home" component={FilterComponent} title="Home" />
                    <Scene key="SelectPLace" component={SelectPalce} title="SelectPLace" />
                    <Scene key="map" component={HomePage} title="map" />
                    <Scene key="History" component={UserVisitHistory} title="History" />
                </Stack>
            </Router>
        )
    }
}
export default AppRouter