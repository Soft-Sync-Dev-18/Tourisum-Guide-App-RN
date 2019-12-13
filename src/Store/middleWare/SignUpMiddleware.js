import { auth, db } from "../../Config/Config";
import { WholeDataMiddleWare } from "./WholeDataMiddleWare";
import { Actions } from "react-native-router-flux";

export function SignUpMiddleWare(data) {
    return dispatch => {
        auth.createUserWithEmailAndPassword(data.email, data.password).then(() => {
            auth.onAuthStateChanged((user) => {
                if (user) {
                    db.ref()
                        .child('wholeData')
                        .child('users')
                        .child(user.uid)
                        .child('personalInfo')
                        .set(data).then(() => {
                            alert('Your account Created SuccesFully')
                            Actions.login()
                            dispatch(WholeDataMiddleWare())
                        })
                }
            })
        }).catch((err) => {
            alert(err.message)
        })
    }
}