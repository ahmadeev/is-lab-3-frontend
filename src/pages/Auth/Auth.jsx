import Navbar from "../../components/Navbar/Navbar.jsx";
import {useEffect, useState} from "react";
import SignInForm from "../../components/AuthForm/SignInForm.jsx";
import SignUpForm from "../../components/AuthForm/SignUpForm.jsx";
import styles from "./Auth.module.css";
import {useLocation} from "react-router-dom";
import Alert from "../../components/Alert/Alert.jsx";

function Auth({ pageTitle, isSignedUp }) {
    const [isSignedUpHook, setIsSignedUpHook] = useState(isSignedUp);
    const location = useLocation();

    const [alertActive, setAlertActive] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");
    const [alertStatus, setAlertStatus] = useState(false);

    const [from, setFrom] = useState(location.state?.from?.pathname || "/");

    const showAlert = () => {
        setAlertActive(true);
    };

    useEffect(() => {
        document.title = pageTitle;
    })

    useEffect(() => {
        if (alertMessage !== "") {
            showAlert();
        }
    }, [alertMessage, alertStatus])

    return (
        <div className={styles.wrapper}>
            <Navbar/>
            {
                isSignedUpHook ?
                    (<SignInForm
                        from={from}
                        setIsSignedUpParentState={setIsSignedUpHook}
                        setAlertMessageParentState={setAlertMessage}
                        setAlertStatusParentState={setAlertStatus}
                    />) :
                    (<SignUpForm
                        from={from}
                        setIsSignedUpParentState={setIsSignedUpHook}
                        setAlertMessageParentState={setAlertMessage}
                        setAlertStatusParentState={setAlertStatus}
                    />)
            }

            <Alert
                message={alertMessage}
                isActive={alertActive}
                onClose={() => setAlertActive(false)}
            />
        </div>
    )
}

export default Auth
