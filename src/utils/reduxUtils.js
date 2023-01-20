export const handlePendingAndRejected = (state, action) => {
    if(action.type.endsWith("pending")) {
        state.isLoading = true;
    } else if(action.type.endsWith("rejected")) {
        state.isLoading = false;
    }
}