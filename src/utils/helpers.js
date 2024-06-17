export const formatDate = (str) => {
    const date = new Date(str);
    const options = { year: "numeric", month: "long", day: "numeric" };
    const formattedDate = date.toLocaleDateString("en-GB", options);
    return formattedDate
};

export const formatTime = (str) => {
    const date = new Date(str);
    const options = { hour: "numeric", minute: "numeric", hour12: true };
    const formattedTime = date.toLocaleTimeString("en-GB", options);
    return formattedTime;
};
