import moment from "moment"

export const formatDate = (date) => {
    date = new Date(date);  // <- remove warnings about non-ISO format

    return moment(date).format("DD-MM-YYYY");
}