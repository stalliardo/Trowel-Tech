export const calculateLiftPrices = (totalPrice) => {
    const gablesPrice = totalPrice * 0.2; 
    const moneyRemaining = totalPrice - gablesPrice; 
    const oneSixth = moneyRemaining / 2 / 6;
    const largeLift = oneSixth * 4;
    const smallLift = oneSixth * 2;
     
    return {smallLift: smallLift.toFixed(2), largeLift: largeLift.toFixed(2), gablesPrice: gablesPrice.toFixed(2)};
}