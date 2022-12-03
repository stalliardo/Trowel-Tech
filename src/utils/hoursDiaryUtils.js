import moment from "moment";

export const extractCurrentWeek = (weeks) => {
    let currentDate = "";
    let highestDate = "";
    let counter = 0;

    weeks.forEach((week) => {
        currentDate = week.weekEnding;

        if (counter === 0) highestDate = currentDate;

        if (currentDate > highestDate) highestDate = currentDate;

        counter++;
    })

    return weeks.find((week) => week.weekEnding === highestDate);
}

export const extractLastSixWeeks = (weeks) => {

    console.log("weeks = ", weeks);

    const testDate = "12-12-2022";
    const formattedTestDate = moment(testDate, ["DDMMYYYY", "MMDDYYYY"]).format(); // Will need to do this to each of the dates in the weeks array to get correct calculations

    const dateSevenWeeksAgo = moment().subtract(7, "weeks").toDate(); // KEEP
    const formattedDateSevenWeeksAgo = moment(dateSevenWeeksAgo).format("DD-MM-YYYY");


    // Ive got the date 7 weeks ago from today,
    // Now use this to loop the weeks and check which dates are greater than or equal to this date
    // valid weeks will then be pushed into an the validWeeks array




    


    


}

export const extractWeeksForUser = () => {
    // TODO
}

export const getWeekTotals = (user) => {
    let hours = 0;
    let gross = 0;

    Object.keys(user).forEach((u) => {
        if (u !== "dayRate" && u !== "id" && u !== "gross" && u !== "name") {
            hours += parseInt(user[u]);
        }
    })
    gross = hours * parseInt(user.dayRate) / 8;

    return { hours, gross };
}

export const getGrossTotal = (users) => {
    let grossTotal = 0;

    users.forEach((user) => {
        grossTotal += user.gross;
    })

    return grossTotal;
}