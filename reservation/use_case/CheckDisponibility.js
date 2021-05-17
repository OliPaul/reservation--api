const {getTimeTables} = require("../services/Timetables");
const {getReservation} = require("../services/Reservation");

const checkAvailability = async (date, reservationId) => {

    // Get timetables from timetables service
    let availability = await getTimeTables(date, reservationId);

    // Verify if resource is opened
    const isOpen = availability.open && verifyTimeTables(date, availability.timetables);
    if (!isOpen) {
        return false;
    }

    console.log("here");
    // Get availability from reservation service
    availability = await getReservation(date, reservationId);

    //Verify if resource is available
    const isAvailable = verifyReservation(date, availability.reservations);
    if (!isAvailable) {
        return false;
    }

    return true;
}

const verifyTimeTables = (date, timeTables) => {
    return timeTables.some((timeTable) =>
        new Date(date) >= new Date(timeTable.opening)
        && new Date(date) <= new Date(timeTable.closing));
}

const verifyReservation = (date, reservations) => {
    const result = reservations.filter((reservation) =>
        new Date(date) >= new Date(reservation.reservationStart)
        && new Date(date) <= new Date(reservation.reservationEnd));

    return result.length === 0;
}

module.exports = {
    checkAvailability
}