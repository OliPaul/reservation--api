export class CheckDisponibility {

    async execute(date: String, reservationId: String) {


        const disponibilityService = new DisponibilityService();
        let disponibility = await disponibilityService.verifyTimeTables(date, reservationId);

        if(!disponibility.open)
            return false;

        disponibility = await disponibilityService.verifyReservation(date, reservationId)

        const reservations = disponibility.reservation.filter(
            (reservation) =>
                new Date(date.toString()) < new Date(reservation.reservationStart)
                && new Date(date.toString()) > new Date(reservation.reservationEnd));

        if(reservations.length <= 0) return false;

        return true;
    }
}

export class DisponibilityService {

    url = "http://localhost:8080/timetables?date=2020-03-19&resourceId=1337"

    async verifyTimeTables(date: String, reservationId: String) {

        const timetable = await fetch(this.url);

        return timetable.json();
    }

    async verifyReservation(date: String, reservationId: String) {
        const reservation = await fetch(this.url);

        return reservation.json();
    }
}