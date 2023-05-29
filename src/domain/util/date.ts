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

    static formatHHMM(
        timeInMinute: number,
        delimiter: {
            hour: string;
            minute: string;
        } = {
            hour: "時間",
            minute: "分",
        }
    ): string {
        if (timeInMinute === 0) {
            return "0" + delimiter.minute;
        }

        const hour = Math.floor(timeInMinute / 60);
        const minute = timeInMinute - hour * 60;
        const hourStr = hour > 0 ? `${hour}${delimiter.hour}` : "";
        const minuteStr =
            minute === 0
                ? ""
                : `${minute.toString().padStart(2, "0")}${delimiter.minute}`;
        return `${hourStr}${minuteStr}`;
    }
}
