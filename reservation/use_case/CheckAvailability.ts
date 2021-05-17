import {ReservationService} from "../services/Reservation";

export class CheckAvailability {

    async execute(date: string, reservationId: number) {

        const availabilityService = new ReservationService();

        // Get timetables from timetables service
        let availability = await availabilityService.getTimeTables(date, reservationId);

        // Verify if resource is opened
        const isOpen = availability.open && this.verifyTimeTables(date, availability.timetables);
        if(!isOpen){
            return false;
        }

        // Get availability from reservation service
        availability = await availabilityService.getReservation(date, reservationId)

        //Verify if resource is available
        const isAvailable = this.verifyReservation(date, availability.reservations);
        if (!isAvailable) {
            return false;
        }

        return true;
    }

    verifyTimeTables(date: string, timeTables: any[])  {
        return timeTables.some((timeTable) =>
            new Date(date) >= new Date(timeTable.opening)
            && new Date(date) <= new Date(timeTable.closing));
    }

    verifyReservation(date: string, reservations: any[]) {
        const result = reservations.filter((reservation) =>
            new Date(date) >= new Date(reservation.reservationStart)
            && new Date(date) <= new Date(reservation.reservationEnd));

        return result.length === 0;
    }
}

