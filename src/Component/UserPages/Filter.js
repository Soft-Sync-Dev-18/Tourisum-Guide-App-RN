import React from 'react'
import {
    TouchableOpacity,
    Animated,
    PermissionsAndroid
} from 'react-native'
import { createTransition, FlipX, SlideUp } from 'react-native-transition';
import { View, Text, Button, Input, Container, Content } from 'native-base'
import { Actions } from 'react-native-router-flux';
import FooterTabs from '../FooterNavBAr/Footer';
import RNLocation from 'react-native-location';
const Transition = createTransition(SlideUp);
const Filterarr = ['accounting',
    'airport',
    'amusement_park',
    'aquarium',
    'art_gallery',
    'atm',
    'bakery',
    'bank',
    'bar',
    'beauty_salon',
    'bicycle_store',
    'book_store',
    'bowling_alley',
    'bus_station',
    'cafe',
    'campground',
    'car_dealer',
    'car_rental',
    'car_repair',
    'car_wash',
    'casino',
    'cemetery',
    'church',
    'city_hall',
    'clothing_store',
    'convenience_store',
    'courthouse',
    'dentist',
    'department_store',
    'doctor',
    'drugstore',
    'electrician',
    'electronics_store',
    'embassy',
    'fire_station',
    'florist',
    'funeral_home',
    'furniture_store',
    'gas_station',
    'grocery_or_supermarket',
    'gym',
    'hair_care',
    'hardware_store',
    'hindu_temple',
    'home_goods_store',
    'hospital',
    'insurance_agency',
    'jewelry_store',
    'laundry',
    'lawyer',
    'library',
    'light_rail_station',
    'liquor_store',
    'local_government_office',
    'locksmith',
    'lodging',
    'meal_delivery',
    'meal_takeaway',
    'mosque',
    'movie_rental',
    'movie_theater',
    'moving_company',
    'museum',
    'night_club',
    'painter',
    'park',
    'parking',
    'pet_store',
    'pharmacy',
    'physiotherapist',
    'plumber',
    'police',
    'post_office',
    'primary_school',
    'real_estate_agency',
    'restaurant',
    'roofing_contractor',
    'rv_park',
    'school',
    'secondary_school',
    'shoe_store',
    'shopping_mall',
    'spa',
    'stadium',
    'storage',
    'store',
    'subway_station',
    'supermarket',
    'synagogue',
    'taxi_stand',
    'tourist_attraction',
    'train_station',
    'transit_station',
    'travel_agency',
    'university',
    'veterinary_care',
    'zoo',
]
// const FadeInView = (props) => {
//     const [fadeAnim] = React.useState(new Animated.Value(0))

//     React.useEffect(() => {
//         Animated.timing(
//             fadeAnim,
//             {
//                 toValue: 1,
//                 duration: 3000,
//             }
//         ).start();
//     }, [])
//     return (
//         <Animated.View
//             style={{
//                 ...props.style,
//                 opacity: fadeAnim,
//             }}
//         >
//             {props.children}
//         </Animated.View>
//     );
// }
class FilterComponent extends React.Component {
    state = {
        place: "",
        Searcharr: []
    }
    change = (ev) => {
        this.setState({
            place: ev,
            Searcharr: [],
        }, (ev) => {

            let { Searcharr } = this.state
            var filter = () => {
                return Object.values(Filterarr).filter(place => {
                    var regex = new RegExp(this.state.place, "gi");
                    return place.match(regex)
                })
            }
            // console.log()
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
    render() {
        return (
            <Container>
                <Content style={{ backgroundColor: 'linear-gradient(to bottom,rgba(2,0,36,1),rgba(56,160,162,1), rgba(0,212,255,1))' }}>


                    {/* <FadeInView style={{ backgroundColor: 'transparent' }}> */}
                    <View>

                        <Input
                            placeholder="Search"
                            value={this.state.place}
                            style={{ color: 'white' }}
                            onChangeText={(ev) => this.change(ev)}
                        />
                    </View>
                    <View>
                        {this.state.Searcharr === 'This Item is Not Found' ?
                            <Text style={{ color: 'white' }}>{this.state.Searcharr}</Text>
                            : this.state.Searcharr.length ?
                                this.state.Searcharr.map((value, index) => {
                                    return <TouchableOpacity style={{ margin: 8, borderColor: 'red' }} onPress={() => {
                                        this.setState({
                                            text: value
                                        })
                                        Actions.SelectPLace({ text: value })
                                    }} key={index}>
                                        <Button onPress={() => {
                                            this.setState({
                                                text: value
                                            })
                                            Actions.SelectPLace({ text: value })
                                        }} warning
                                            rounded
                                            bordered transparent>
                                            <Text>{value}</Text>
                                        </Button>
                                    </TouchableOpacity>
                                })
                                :
                                Filterarr.map((value, index) => {
                                    return <TouchableOpacity style={{ margin: 8, borderColor: 'red' }} onPress={() => {
                                        this.setState({
                                            text: value
                                        })
                                        Actions.SelectPLace({ text: value })
                                    }} key={index}>
                                        <Button
                                            onPress={() => {
                                                this.setState({
                                                    text: value
                                                })
                                                Actions.SelectPLace({ text: value })
                                            }}
                                            warning
                                            rounded
                                            style={{ height: 50 }}

                                            bordered transparent>
                                            <Text>{value}</Text>
                                        </Button>
                                    </TouchableOpacity>
                                })}
                    </View>
                    {/* </FadeInView> */}
                </Content>
                <FooterTabs select={this.state.text} />
            </Container>

        )
    }
}
export default FilterComponent