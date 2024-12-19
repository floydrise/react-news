import axios from "axios";

const convertDate = (isoDate) => {
    const date = new Date(isoDate);
    return date.toUTCString().match(/\w+.\w+.\w+.\w+:\w+/ig)[0];
}

export const reqUrl = axios.create({
    baseURL: "https://news-api-40x5.onrender.com/api"
})

export {convertDate};