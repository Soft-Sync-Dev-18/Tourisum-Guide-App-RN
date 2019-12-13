import React from 'react'
import { PermissionsAndroid } from 'react-native'
import { View, Text, Button, Input, Spinner, Container, Content } from 'native-base'
import FooterTabs from '../FooterNavBAr/Footer'
import { Actions } from 'react-native-router-flux'
import Geolocation from 'react-native-geolocation-service';

class SelectPalce extends React.Component {
    state = {
        x: {},
        arr: [],
        Searcharr: [],
        place: "",
    }
    change = (ev) => {
        this.setState({
            place: ev,
            Searcharr: [],
        }, (ev) => {

            let { Searcharr } = this.state
            var filter = () => {
                return Object.values(this.state.arr).filter(place => {
                    var regex = new RegExp(this.state.place, "gi");
                    return place.name.match(regex)
                })
            }
            // console.log(filter())
            Searcharr = filter()
            if (Searcharr.length) {

                this.setState({
                    Searcharr
                }, () => {
                    console.log(this.state.Searcharr)
                })
            } else {
                this.setState({
                    Searcharr: 'This Item is Not Found'
                }, () => {
                    console.log(this.state.Searcharr)
                })
            }
        })

    }
    componentWillMount() {
        requestLocationPermission = async () => {
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
                            // console.log(position, 'xyzcjhzxgbh');

                            this.setState({
                                x: data
                            })

                        },
                        error => {
                            // See error code charts below.
                            //   console.log(error.code, error.message);
                        },
                        { enableHighAccuracy: true, timeout: 500, maximumAge: 10000 },
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
    componentDidMount() {
        if (this.state.x) {

            setTimeout(() => {
                // console.log(this.state.x,this.props.text, 'hwllooo')
                fetch(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${this.state.x.latitude},${this.state.x.longitude}&radius=50000&types=${this.props.text}&fields=photos,formatted_address,name,rating,opening_hours,geometry&sensor=false&key=AIzaSyAidyyx75461PP4ZWVyJXMIWx1waT_e9JM`)
                    .then(response => response.json())
                    .then(json => {
                        // console.log(json)
                        // this.setState({ nextPageToken: json.next_page_token })
                        var { arr } = this.state
                        var result = json.results
                        for (var i = 0; i < result.length; i++) {
                            console.log(json)
                            // console.log()
                            var obj = {
                                photos: result[i].photos,
                                name: result[i].name,
                                opening_hours: result[i].opening_hours,
                                plus_code: result[i].plus_code,
                                place_id: result[i].place_id,
                                geometry: result[i].geometry
                            }
                            arr.push(obj)

                        }

                        this.setState({
                            arr
                        })
                    })

            }, 2000)
        }
    }
    render() {
        let { arr, Searcharr } = this.state
        return (
            <Container >
                <Content>

                    <View>

                        <Input
                            placeholder="Search"
                            value={this.state.place}
                            onChangeText={(ev) => this.change(ev)}
                        />
                    </View>
                    {Searcharr === 'This Item is Not Found' ?
                        <Text>{Searcharr}</Text>
                        :
                        Searcharr.length ?
                            Searcharr.map((value) => {
                                // console.log(value)
                                return (
                                    <View>
                                        <Button style={{ padding: 10 }} onPress={() => {
                                            Actions.map({
                                                value,
                                                params: {
                                                    latitude: value.geometry.location.lat,
                                                    longitude: value.geometry.location.lng
                                                }

                                            })
                                        }} bordered warning rounded transparent>
                                            <Text style={{ fontSize: 10 }}>{value.name}
                                                {`\n`}
                                                <Text style={{ color: 'grey', fontSize: 8 }}>({value.plus_code.compound_code&&value.plus_code.compound_code})</Text>
                                                {/* <Text style={{ color: 'grey', fontSize: 8 }}>({value.plus_code.compound_code})</Text> */}
                                            </Text>

                                        </Button>
                                    </View>
                                )
                            })
                            :
                            arr.length ?
                                arr.map((value) => {
                                    // console.log(value)
                                    return (
                                        <View>
                                            <Button style={{ padding: 10 }} onPress={() => {
                                                Actions.map({
                                                    value,
                                                    params: {
                                                        latitude: value.geometry.location.lat,
                                                        longitude: value.geometry.location.lng
                                                    }

                                                })
                                            }} bordered warning rounded transparent>
                                                <Text style={{ fontSize: 10 }}>{value.name}
                                                    {`\n`}
                                                    {/* <Text></Text> */}
                                                    {/* {`\n`} */}
                                                    <Text style={{ color: 'grey', fontSize: 8 }}>({value.plus_code.compound_code&&value.plus_code.compound_code})</Text>
                                                </Text>

                                            </Button>
                                        </View>
                                    )
                                })
                                : <Spinner />}
                </Content>
                <FooterTabs render={1} />
            </Container>
        )
    }
}
export default SelectPalce