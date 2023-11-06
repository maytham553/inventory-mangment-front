import type { Purchase, TransactionType } from "@/Types";

export const formatCurrency = (number: number) => {
    return String(number + " " + 'د.ع')
}

export const ISO8601DateToHumanDate = (date: string) => {
    const jsDate = new Date(date);
    const options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
    };
    const formattedDate = new Intl.DateTimeFormat(undefined, options).format(jsDate);
    return formattedDate;
}

export const convertTransactionTypeToArabic = (type: TransactionType) => {
    switch (type) {
        case 'debit':
            return 'طلب';
        case 'credit':
            return 'تسديد';
        default:
            return 'غير معروف';
    }
}


export const sumTotal = (array: any[], key: string) => {
    let total = 0;
    array.forEach((item) => {
        total += parseInt(item[key]);
    });
    return total;
}

export const calculateDiscountPercentage = (subTotal: number, discountAmount: number, fractionDigits: number): number => {
    return Number(((discountAmount / subTotal) * 100).toFixed(fractionDigits));
}

export const calculateSubtotal = (quantity: number, unitPrice: number , fractionDigits: number): number => {
    return Number((quantity * unitPrice).toFixed(fractionDigits));
}

export const calculateTotal = (subTotal: number, discountAmount: number , fractionDigits: number): number => {
    return Number((subTotal - discountAmount).toFixed(fractionDigits));
}