import React from 'react'
import { View, Text, Toast, Button, Spinner } from 'native-base'
import {
    StyleSheet,
    Image,
    PermissionsAndroid
} from 'react-native';
import Modal from 'react-native-modal'
import { connect } from 'react-redux';
import MapViewDirections from 'react-native-maps-directions';
import image from './../../images/pin2.png'
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { UserCompleteRideMiddleWare } from '../../Store/middleWare/UserHistoryMiddleWare';
import { ActionConst, Actions } from 'react-native-router-flux';
import Geolocation from 'react-native-geolocation-service';

class HomePage extends React.Component {
    state = {
        region: '',
        x: {
            latitude:
                24.8714173,
            longitude:
                67.0046765,
        }
    }
    onRegionChange = (region) => {
        // console.log(region)
        this.setState({ region });
    }
    componentWillReceiveProps() {

    }
    // componentDidMount() {
    //Complete Destination in hand
    //     this.setState({
    //         VisitTrue: this.props.params
    //     }, () => {
    //         if (this.state.VisitTrue == this.props.params) {
    //             this.setState({
    //                 complete: true
    //             })
    //         }
    //     })
    // }
    _SaveHistory = () => {
        let { value, data } = this.props
        let Send_data = {
            VisitPoint: value,
            currentLocation: this.state.x,
            date: new Date().toDateString()
        }
        this.props.SaveUSerRideData(Send_data)
        if (data.isLoading) {
            this.setState({ complete: false })
            Actions.Home()
        }
    }
    getRegionForCoordinates = (point) => {
        const oneDegreeOfLongitudeInMeters = 111.32 * 1000;
        const circumference = (40075 / 360) * 1000;

        const latDelta = point.accuracy * (1 / (Math.cos(point.latitude) * circumference));
        const lonDelta = (point.accuracy / oneDegreeOfLongitudeInMeters);

        return {
            latitude: point.latitude,
            longitude: point.longitude,
            latitudeDelta: Math.max(0, latDelta),
            longitudeDelta: Math.max(0, lonDelta),
            accuracy: point.accuracy,
            angle : point.heading,
            altitude : point.altitude
        };
    }
    componentWillMount() {
        requestLocationPermission = async () => {
            // let { region } = this.state
            try {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                    {
                        title: 'location Permission',
                        message:
                            'this App needs access to your current Location ',
                        buttonNeutral: 'Ask Me Later',
                        buttonNegative: 'Cancel',
                        buttonPositive: 'OK',
                    },
                );
                if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                    Geolocation.getCurrentPosition(
                        position => {
                            let data = {
                                latitude: position.coords.latitude,
                                longitude: position.coords.longitude,
                            };
                            console.log(position)

                            // var minX = data.latitude;
                            // var maxX = data.latitude;
                            // var minY = data.longitude;
                            // var maxY = data.longitude;
                            // minX = Math.min(minX, data.latitude);
                            // maxX = Math.max(maxX, data.latitude);
                            // minY = Math.min(minY, data.longitude);
                            // maxY = Math.max(maxY, data.longitude)
                            // const deltaX = (maxX - minY);
                            // const deltaY = (maxY - minX);
                            // let region = {
                            //     latitude: position.coords.latitude,
                            //     longitude: position.coords.longitude,
                            //     latitudeDelta: this.state.region.latitudeDelta,
                            //     longitudeDelta: this.state.region.longitudeDelta,
                            // }
                            let region = this.getRegionForCoordinates(position.coords)
                            // console.log(region)
                            // if (region) {
                            // console.log(region)
                            this.setState({
                                x: data,
                                region
                            }, () => {
                                // console.log(this.state)
                            })
                            // }

                        },
                        error => {
                            //   console.log(error.code, error.message);
                        },
                        { enableHighAccuracy: true, timeout: 500, maximumAge: 1000 ,distanceFilter: 10 },
                    );
                } else {
                    console.log('location permission denied');
                }
            } catch (err) {
                console.warn(err);
            }
        };
        requestLocationPermission();
    }
    render() {
        // console.log(this.props)
        return (
            <View accessible={true} style={style.container} >
                {this.state.region ?
                    <View accessible={true} style={style.container}>
                        <MapView
                            provider={PROVIDER_GOOGLE}
                            key="AIzaSyAidyyx75461PP4ZWVyJXMIWx1waT_e9JM"
                            style={style.map}
                            showsUserLocation={true}
                            mapType='standard'
                            followsUserLocation={true}
                            loadingEnabled
                            // onRegionChange={this.onRegionChange}
                            region={this.state.region}
                            zoomEnabled
                            scrollEnabled
                            zoomControlEnabled={true}
                            rotateEnabled = {true}
                            compassOffset={this.state.x}
                        >
                            <MapViewDirections
                                origin={this.state.x}
                                // destination={{latitude : 24.859455, longitude : 67.028689}}
                                destination={this.props.params}
                                apikey='AIzaSyAidyyx75461PP4ZWVyJXMIWx1waT_e9JM'
                                strokeWidth={5}
                                strokeColor="red"

                            />
                            {/* <Marker
                                draggable
                                coordinate={this.state.x}
                                // onDragEnd={(e) => {
                                //     this.setState({ x: e.nativeEvent.coordinate })
                                // }}
                                // icon={image}
                                pinColor='blue'
                            /> */}
                            <Marker
                                draggable
                                coordinate={this.props.params}
                                // onDragEnd={(e) => {
                                //     this.setState({ x: e.nativeEvent.coordinate })
                                // }}
                                // icon={image}
                                pinColor='red'
                            />
                        </MapView>
                        <Button success style={{ position: 'relative', bottom: 0 }} onPress={() => this.setState({ complete: true })}><Text>Complete Your Route</Text></Button>
                    </View>
                    : <Spinner />}
                <Modal
                    onSwipeComplete={() => this.setState({ complete: false })}
                    swipeDirection="left"
                    animationIn="shake"

                    isVisible={this.state.complete}>
                    <View
                        style={{ backgroundColor: 'white', padding: 50 }}
                    >
                        <Text>Heyy!</Text>
                        <Text>Your Route Is Complete</Text>
                        <Text>I hope You Easly Find This PLace</Text>
                        <View style={{ display: 'flex', flexDirection: 'column', width: 300 }}>
                            <Button
                                small
                                transparent
                                style={{ width: 100, alignSelf: 'flex-end' }}
                                onPress={() => this._SaveHistory()} >
                                <Text>YEs</Text>
                            </Button>

                        </View>
                    </View>
                </Modal>
            </View>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        data: state.SaveHistoryReducer
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        SaveUSerRideData: data => dispatch(UserCompleteRideMiddleWare(data))
    }
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(HomePage)
const style = StyleSheet.create({
    map: {
        flex: 1,
        height: 500,
        width: 1000
    },
    container: {
        flex: 1,

    }
})