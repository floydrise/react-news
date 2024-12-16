const convertDate = (isoDate) => {
    const date = new Date(isoDate);
    return date.toUTCString();
}

export {convertDate};