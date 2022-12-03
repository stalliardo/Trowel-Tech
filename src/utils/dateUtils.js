import moment from "moment"

export const formatDate = (date) => {
    date = new Date(date);
    return moment(date).format("DD-MM-YYYY");
}