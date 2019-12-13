import { auth, db } from "../../Config/Config";
import { WholeDataAction } from "../Actions/WholeDataAction";

export function WholeDataMiddleWare() {
    return dispatch => {
        auth.onAuthStateChanged((user) => {
            if (user) {
                db.ref()
                    .child('wholeData')
                    .on('value', (snap) => {

                        dispatch(WholeDataAction(snap.val()))
                    })

            }
        })
    }
} 