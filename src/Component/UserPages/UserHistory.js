import React from 'react'
import { View, Text, Container, Content, List, ListItem } from 'native-base'
import FooterTabs from '../FooterNavBAr/Footer'
import { connect } from 'react-redux'
import { WholeDataMiddleWare } from '../../Store/middleWare/WholeDataMiddleWare'
import { auth } from '../../Config/Config'
class UserVisitHistory extends React.Component {
    state = {
        data: []
    }
    componentWillMount() {
        if(!this.props.data.data){
            this.props.Get_Data()
        }
    }
    componentWillReceiveProps() {
        if (this.props.data) {
            auth.onAuthStateChanged((user) => {
                if (user) {
                    this.setState({
                        data: this.props.data.data.userVisitHistory[user.uid]
                    })
                }
            })
        }
    }
    render() {
        let { data } = this.state
        return (
            <Container style={{backgroundColor: 'linear-gradient(to bottom,rgba(2,0,36,1),rgba(56,160,162,1), rgba(0,212,255,1))'}}>
                <Content >
                    <View >
                        <List>
                            {data ?
                                Object.values(data).map((value, index) => {
                                    // console.log(value)
                                    return (
                                        <ListItem style={{backgroundColor : '#a3a34b' , margin : 5 , borderRadius : 20 , height : 50 }}>
                                            <Text style={{textAlign:"center" ,  width  :300}}>{value.VisitPoint.name}</Text>
                                        </ListItem>
                                    )
                                }) : <Text>loaddding.......</Text>}
                        </List>
                    </View>
                </Content>
                <FooterTabs />
            </Container >
        )
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        Get_Data: data => dispatch(WholeDataMiddleWare())
    }
}
const mapStateToProps = (state) => {
    return {
        data: state.WholeDataReducer
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(UserVisitHistory)