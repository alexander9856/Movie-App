import { Store } from 'react-notifications-component';
export const createNotification = (title, message, type) => {
    Store.addNotification({
        title,
        message,
        type,
        insert: "top",
        container: "top-left",
        animationIn: ["animate__animated", "animate__fadeIn"],
        animationOut: ["animate__animated", "animate__fadeOut"],
        dismiss: { duration: 2000 }
    });
};

export const capitalize = (value) => value[0].toUpperCase() + value.slice(1);