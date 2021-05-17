import axios from "axios";

export class ReservationService {

    async getTimeTables(date: String, reservationId: number) {
        const url = `${process.env.RESERVATION_URL}/timetables?date=${date}&resourceId=${reservationId}`;
        const timetable = await axios.get(url);

        return timetable.data;
    }

    async getReservation(date: String, reservationId: number) {
        const url = `${process.env.RESERVATION_URL}/reservations?date=${date}&resourceId=${reservationId}`;
        const reservation = await axios.get(url);

        return reservation.data;
    }
}