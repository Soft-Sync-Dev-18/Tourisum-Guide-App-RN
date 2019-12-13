import React, { Component } from 'react';
import { Container, Footer, FooterTab, Button, Icon, Text, Content, View } from 'native-base';
// import HomePage from '../UserPages/homePage';
import FilterComponent from '../UserPages/Filter';
import { Actions } from 'react-native-router-flux';
class FooterTabs extends Component {
    state = {
        render: this.props.render ? this.props.render : 1
    }
    render() {
        let { render } = this.state
        return (
            <Footer >
                <FooterTab style={{backgroundColor: 'linear-gradient(to bottom,rgba(2,0,36,1),rgba(56,160,162,1), rgba(0,212,255,1))'}}>
                    <Button
                    warning
                    transparent
                        onPress={() => {
                            Actions.Home()
                            this.setState({
                                render: 1
                            })
                        }}
                        // active={render == 1 ? true : false}
                        vertical>
                        <Icon name="apps" />
                        <Text>Places</Text>
                    </Button>
                    <Button warning transparent onPress={() => {
                        Actions.History()
                        this.setState({
                            render: 2
                        })
                    }}
                        active={render == 2 ? true : false} vertical>
                        <Icon active type="FontAwesome" name="history" />
                        <Text >History</Text>
                    </Button>
                </FooterTab>
            </Footer >
        );
    }
}
export default FooterTabs