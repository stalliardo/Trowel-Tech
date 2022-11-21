export const calculateLiftPrices = (totalPrice) => {
    const gablesPrice = totalPrice * 0.2; 
    const moneyRemaining = totalPrice - gablesPrice; 
    const oneSixth = moneyRemaining / 2 / 6;
    const largeLift = oneSixth * 4;
    const smallLift = oneSixth * 2;
     
    return {smallLift: smallLift.toFixed(2), largeLift: largeLift.toFixed(2), gablesPrice: gablesPrice.toFixed(2)};
}

export const checkTotalsMatch = (totalPrice, data, exclude) => {
    let total = 0;
    
    Object.keys(data).forEach((key) => {
        if(key !== exclude){
            total += parseInt(data[key]);
        }
    });

    if(totalPrice > total) {
        return `There is an under estimate of £${totalPrice - total}. Plot price: ${totalPrice}. Current price: ${total} Please fix this then try saving again.`;
    } else if (totalPrice < total) {
        return `There is an over estimate of £${total - totalPrice}. Plot price: ${totalPrice}. Current price: ${total} Please fix this then try saving again.`
    } else if (total === isNaN) {
        return "";
    } else {
        return "Values match";
    }
}