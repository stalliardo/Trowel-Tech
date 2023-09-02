export const extractTotalForLift = (deductionsArray, liftType) => {
    const filteredDeductions = deductionsArray.filter(element => element.lift === liftType);
    const total = extractTotal(filteredDeductions);

    return extractTotal(filteredDeductions);
}

export const extractTotal = (deductionsArray) => {
    let total = 0;

    deductionsArray.forEach((deduction) => {
        total += deduction.hourlyRate * parseFloat(deduction.hours);
    })

    return total;
}

export const calculateCurrentFinancialsForLift = (deductionTotal, liftPrice) => {
    return parseInt(liftPrice) - deductionTotal;
}

export const returnPriceFromLiftName = (liftInformation, liftType) => {
    console.log("lift info = ", liftInformation);
    if(liftInformation){
        switch(liftType) {
            case "1st Lift" : {
                return liftInformation.firstLift;
            }
            case "2nd Lift" : {
                return liftInformation.secondLift;
            }
            case "3rd Lift" : {
                return liftInformation.thirdLift;
            }
            case "4th Lift" : {
                return liftInformation.fourthLift;
            }
            case "Gables" : {
                return liftInformation.gables;
            }
            case "Other" : {
                return liftInformation.other;
            }
        }
    }
}