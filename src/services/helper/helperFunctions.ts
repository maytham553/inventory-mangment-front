import type { Purchase, TransactionType, UserType } from "@/Types";

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


export const formatFileSize = (bytes: number) => {
    if (!bytes) {
        return '0 KB'
    }
    const megabytes = bytes / 1024 / 1024

    return megabytes >= 1
        ? `${megabytes.toFixed(2)} MB`
        : `${(bytes / 1024).toFixed(0)} KB`
}

export const userTypeOptions: { value: UserType, label: string }[] = [
    { value: 'User', label: 'مستخدم' },
    { value: 'Admin', label: 'مدير' },
    { value: 'SuperAdmin', label: 'مدير عام' },
]

export const convertUserTypeToArabic = (type: UserType) => {
    return userTypeOptions.find((option) => option.value === type)?.label ?? 'غير معروف'
}

export const sumTotal = (array: any[], key: string) => {
    let total = 0;
    array.forEach((item) => {
        total += parseInt(item[key]);
    });
    return total;
}

// purchase or sale status t arabic 
export const convertPurchaseStatusToArabic = (status: string) => {
    switch (status) {
        case 'pending':
            return 'معلقة';
        case 'confirmed':
            return 'مكتملة';
        case 'cancelled':
            return 'ملغية';
        default:
            return 'غير معروف';
    }
}

export const calculateDiscountPercentage = (subTotal: number, discountAmount: number, fractionDigits: number): number => {
    return Number(((discountAmount / subTotal) * 100).toFixed(fractionDigits));
}

export const calculateSubtotal = (quantity: number, unitPrice: number, fractionDigits: number): number => {
    return Number((quantity * unitPrice).toFixed(fractionDigits));
}

export const calculateTotal = (subTotal: number, discountAmount: number, fractionDigits: number): number => {
    return Number((subTotal - discountAmount).toFixed(fractionDigits));
}

export const getPrintCssPath = (): string => {
    const appCssLink = Array.from(document.querySelectorAll('link[rel="stylesheet"]'))
        .map((link) => (link as HTMLLinkElement).href)
        .find((href) => href.includes("/assets/") && href.endsWith(".css"));

    return appCssLink || `${window.location.origin}${import.meta.env.BASE_URL}src/assets/main.css`;
}

// Chrome draws its own header and footer — the page URL, the date, "1/1" — in the
// @page margin. Zeroing that margin leaves it nowhere to put them, so the padding
// that keeps the receipt off the paper edge has to move onto the body instead.
export const printPageStyle = `
    @page {
        size: auto;
        margin: 0;
    }
    @media print {
        body {
            margin: 0;
            padding: 10mm;
        }
        .print {
            width: 100%;
            height: 100%;
            overflow: scroll;
        }
    }
`;