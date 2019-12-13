import { auth, db } from "../../Config/Config";
import { Actions } from "react-native-router-flux";
import { SaveHistoryAction } from "../Actions/SaveUSerRideHistoryAction";

export function UserCompleteRideMiddleWare(data) {
    return dispatch => {

        auth.onAuthStateChanged((user) => {
            if (user) {
                db.ref()
                    .child('wholeData')
                    .child('userVisitHistory')
                    .child(user.uid)
                    .push(data).then(() => {
                        alert('Your Visit Area Save inHistory SuccesFully')
                        dispatch(SaveHistoryAction())
                        // Actions.Home()
                    })

            }
        })
    }

} 