const axios = require("axios");

const getTimeTables = async (date, reservationId) => {

    const url = `${process.env.RESERVATION_URL}/timetables?date=${date}&resourceId=${reservationId}`;
    const timetable = await axios.get(url);

    return timetable.data;
}

module.exports = {
    getTimeTables
}