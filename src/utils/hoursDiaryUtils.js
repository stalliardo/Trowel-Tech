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

export const extractWeeksForUser = () => {
    // TODO
}   

export const getWeekTotals = (user) => {
    let hours = 0;
    let gross = 0;

    Object.keys(user).forEach((u) => {
        if(u !== "dayRate" && u !== "id" && u !== "gross" && u !== "name") {
            hours += parseInt(user[u]);
        }
    })
    gross = hours * parseInt(user.dayRate) / 8;

    return {hours, gross};
}

export const getGrossTotal = (users) => {
    let grossTotal = 0;
    
    users.forEach((user) => {
        grossTotal += user.gross;
    })

    return grossTotal;
}