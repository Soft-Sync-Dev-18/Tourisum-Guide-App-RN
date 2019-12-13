import React from 'react'
import { View, Text, Button, Container, Content, Item, Input } from 'native-base'
import { Actions } from 'react-native-router-flux'
import { styles } from './style'
import { TouchableOpacity, ImageBackground } from 'react-native'
import img from '../../images/image.jpg'
import img2 from '../../images/img2.png'
import { connect } from 'react-redux'
import { SignInMiddleWare } from '../../Store/middleWare/SignInMIddileWare'
import { auth } from '../../Config/Config'
// class Login extends React.Component {
//     state = {
//         email: "",
//         password: "",
//         confoPassword: "",
//         name: "",
//         number: "",
//         gender: ""
//     }
//     _getValue = (ev, value) => {
//         this.setState({
//             [value]: ev
//         })
//     }
//     _SignIn = () => {
//         // let { email, password } = this.state
//         // if (email, password) {
//         //     let data = {
//         //         email,
//         //         password
//         //     }
//         //     this.props.SignIn(data)
//         // }
//         let { PHnumber } = this.state
//     }
//     // componentDidMount() {
//     //     auth.onAuthStateChanged((user) => {
//     //         if (user) {
//     //             Actions.Home()
//     //         }
//     //     })
//     // }
//     render() {
//         return (
//             <ImageBackground source={img} style={{ width: '100%', height: '100%' }}>
//                 <View style={{ width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.5)' }}>

//                     <View style={styles.mainDiv}>
//                         <View
//                             style={{ width: '100%', height: 200 }}>
//                             <ImageBackground source={img2}
//                                 style={{
//                                     marginLeft: 'auto',
//                                     marginRight: 'auto',
//                                     width: '80%',
//                                     height: '100%'
//                                 }} />
//                         </View>
//                         <View style={styles.form}>
//                             <Item style={styles.input} rounded>
//                                 <Input
//                                     value={this.state.PHnumber}
//                                     onChangeText={(ev) => this._getValue(ev, 'PHnumber')}
//                                     style={styles.inputColor} placeholder='Email' />
//                             </Item>
//                             <Item style={styles.input} rounded>
//                                 <Input
//                                     value={this.state.password}
//                                     onChangeText={(ev) => this._getValue(ev, 'password')}
//                                     style={styles.inputColor} secureTextEntry placeholder='Password' />
//                             </Item>

//                             <Button rounded style={styles.btn}>
//                                 <TouchableOpacity onPress={this._SignIn}>
//                                     <Text style={{
//                                         textAlign: 'center',
//                                         width: 1000
//                                     }}>
//                                         LogIn
//                         </Text>
//                                 </TouchableOpacity>
//                             </Button>
//                             <View style={styles.lineStyle} />
//                             <Text style={styles.registerText}>Or</Text>
//                             <Button onPress={() => Actions.register()} small transparent style={styles.btn2}>
//                                 <Text
//                                     style={{
//                                         textAlign: 'center',
//                                         width: 200
//                                     }}>
//                                     Register Now
//                         </Text>
//                             </Button>

//                         </View>
//                     </View>
//                 </View>

//             </ImageBackground>
//         )
//     }
// }
const useState = React.useState
function Login(data, SignIn) {
    const [index, setIndex] = useState(data);
    // const add = () => {
    console.log(index,SignIn, 'fdsf');
    // };
    return (
        <View>
            <Text>HEllo</Text>
        </View>
    )
}
const mapStateToProps = (state) => {
    return {
        data: state.WholeDataReducer
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        SignIn: data => dispatch(SignInMiddleWare(data))
    }
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Login)
