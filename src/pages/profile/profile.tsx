import { NavLink, useLocation } from "react-router-dom";
import styles from "./profile.module.css";
import { logOut } from "../../services/actions/auth";
import { dispatchStore } from "../../utils/utils";
import { ProfileForm } from "../../components/profile-form/profile-form";
import { FeedList } from "../../components/feed-list/feed-list";
export function ProfilePage() {
    const handleLogOut = () => {
        dispatchStore(logOut());
    };
    const location = useLocation();
    const locationIs = location.pathname;
    return (
        <div className={styles.container}>
            <div className={styles.container_navigate}>
                <NavLink
                    to="/profile"
                    exact
                    activeClassName={styles.button_active}
                    className={`${styles.button_text} text text_type_main-medium`}
                >
                    Профиль
                </NavLink>
                <NavLink
                    exact
                    to="/profile/orders"
                    activeClassName={styles.button_active}
                    className={`${styles.button_text} text text_type_main-medium`}
                >
                    История заказов
                </NavLink>
                <NavLink
                    to="/login"
                    onClick={handleLogOut}
                    activeClassName={styles.button_active}
                    className={`${styles.button_text} text text_type_main-medium`}
                >
                    Выход
                </NavLink>
            </div>
            {locationIs === "/profile" ? <ProfileForm /> : <FeedList />}
        </div>
    );
}
