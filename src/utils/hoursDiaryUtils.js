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

    return weeks.filter((week) => week.weekEnding === highestDate);
}

export const extractWeeksForUser = () => {
    // TODO
}   