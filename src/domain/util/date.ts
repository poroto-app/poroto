export class DateHelper {
    static Minute = 60 * 1000;

    static dateToHHMM(date: Date): string {
        const hour = date.getHours();
        const minute = date.getMinutes();
        return `${hour}:${minute.toString().padStart(2, "0")}`;
    }

    static add(date: Date, timeInMilliSec: number): Date {
        return new Date(date.getTime() + timeInMilliSec);
    }
}
