import { useEffect, useState } from "react"
import { getWeekTotals } from "../utils/hoursDiaryUtils";

export const useWeekData = (users) => {
    const [data, setData] = useState({});

    let grossTotal = 0;
    let hoursTotal = 0;
    let totals = {};

    useEffect(() => {
        if (users) {
            users.forEach((user) => {
                totals = getWeekTotals(user);

                grossTotal += totals.gross;
                hoursTotal += totals.hours;
            })
        }

        setData({ grossTotal, hoursTotal });
    }, [users])

    return data;
}