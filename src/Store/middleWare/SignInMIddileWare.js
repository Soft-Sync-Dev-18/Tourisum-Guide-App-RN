import { auth } from "../../Config/Config";
import { WholeDataMiddleWare } from "./WholeDataMiddleWare";

export function SignInMiddleWare(data) {
    return dispatch => {
        auth.signInWithEmailAndPassword(data.email, data.password).then(() => {
            alert('login Succesfull')
            dispatch(WholeDataMiddleWare())
        }).catch((err) => {
            alert(err.message)
        })
    }
} 