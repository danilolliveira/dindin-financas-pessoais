import { format } from 'date-fns'

export function formatDate(date, style) {
    const formatedDate = format(new Date(date), style || 'dd/MM/yyyy');
    return formatedDate
}

export function getDayOfWeek(date) {
    const newDate = new Date(date);
    const weekIndex = newDate.getDay();
    switch (weekIndex) {
        case 0:
            return 'Domingo';
        case 1:
            return 'Segunda';
        case 2:
            return 'Terça';
        case 3:
            return 'Quarta';
        case 4:
            return 'Quinta';
        case 5:
            return 'Sexta'
        case 6:
            return 'Sábado'
    }
}