const axios = require("axios");

const getReservation = async (date, reservationId) => {

    const url = `${process.env.RESERVATION_URL}/reservations?date=${date}&resourceId=${reservationId}`;
    const reservation = await axios.get(url);

    return reservation.data;

}

module.exports = {
    getReservation
}