import React from 'react'
import { View, Text, Button, Container, Content, Item, Input, Fab, Picker } from 'native-base'
import { Actions } from 'react-native-router-flux'
import { connect } from 'react-redux'
import { styles } from './style'
import { TouchableOpacity, ImageBackground } from 'react-native'
import Icon from 'react-native-vector-icons/AntDesign'
import img from '../../images/image.jpg'
import img2 from '../../images/img2.png'
import { SignUpMiddleWare } from '../../Store/middleWare/SignUpMiddleware'
class SignUp extends React.Component {
    state = {
        email: "",
        password: "",
        confoPassword: "",
        name: "",
        number: "",
        gender: ""
    }
    _getValue = (ev, value) => {
        this.setState({
            [value]: ev
        })
    }
    _signUp = () => {
        let { email, number, password, name, gender } = this.state
        if (email && number && password && name && gender) {
            if (number.length == 11) {
                if (gender != "select Gender") {
                    let data = {
                        name,
                        email,
                        number,
                        password,
                        gender,
                        category: "user"
                    }
                    this.props.SignUp(data)
                } else {
                    alert('please select gender')
                }
            } else {
                alert('please Check Number Limit')
            }
        } else {
            alert('please Filled all fields')
        }
    }
    render() {
        return (
            <ImageBackground source={img} style={{ width: '100%', height: '100%' }}>
                <View style={{ width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.5)' }}>
                    <Fab
                        // active={true}
                        direction="right"
                        containerStyle={{ marginLeft: 10, }}
                        style={{ backgroundColor: '#5067FF', width: 40, height: 40 }}
                        position="topLeft"
                        onPress={() => Actions.login()}
                    >
                        <Icon name="back" size={8} />
                    </Fab>
                    <View style={styles.mainDiv}>
                        <View style={styles.form}>
                            <Item style={styles.input} rounded>
                                <Input
                                    value={this.state.name}
                                    onChangeText={(ev) => this._getValue(ev, 'name')}
                                    style={styles.inputColor} placeholder='Full Name' />
                            </Item>
                            <Item style={styles.input} rounded>
                                <Input

                                    value={this.state.number}
                                    onChangeText={(ev) => this._getValue(ev, 'number')}

                                    style={styles.inputColor} keyboardType="numeric" placeholder='Number' />
                            </Item>
                            <Item style={styles.input} rounded>
                                <Input
                                    value={this.state.email}
                                    onChangeText={(ev) => this._getValue(ev, 'email')}
                                    style={styles.inputColor} placeholder='Email' />
                            </Item>
                            <Item style={styles.input} rounded>
                                <Input
                                    value={this.state.password}
                                    onChangeText={(ev) => this._getValue(ev, 'password')}
                                    style={styles.inputColor} secureTextEntry placeholder='Password' />
                            </Item>
                            <Item style={styles.input} rounded>
                                <Input
                                    value={this.state.confoPassword}
                                    onChangeText={(ev) => this._getValue(ev, 'confoPassword')}
                                    style={styles.inputColor} secureTextEntry placeholder='Confirm password' />
                            </Item>
                            <Item style={styles.input} rounded>
                                <Picker
                                    style={{ color: 'white' }}
                                    mode="dropdown"
                                    selectedValue={this.state.gender}
                                    onValueChange={(ev) => this._getValue(ev, 'gender')}
                                >
                                    <Item disabled label="select Gender" value="select Gender" />
                                    <Item label="Male" value="Male" />
                                    <Item label="Female" value="Female" />
                                    <Item label="Other" value="Other" />
                                </Picker>

                            </Item>
                            <Button  rounded style={styles.btn}>
                                <TouchableOpacity onPress={this._signUp}>
                                    <Text style={{
                                        textAlign: 'center',
                                        width: 1000
                                    }}>
                                        SignUp
                        </Text>
                                </TouchableOpacity>
                            </Button>
                        </View>
                    </View>
                </View>

            </ImageBackground>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        data : state.WholeDataReducer
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        SignUp: data => dispatch(SignUpMiddleWare(data))
    }
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SignUp)