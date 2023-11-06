import { sales, customers } from '@/services/api'
import { calculateDiscountPercentage, calculateSubtotal, calculateTotal, sumTotal } from '@/services/helper/helperFunctions'
import { defineStore } from 'pinia'
import type { Sale, Status, Pagination, Product, Customer, SaleProduct } from '@/Types'
import { PDFDocument, PDFPage, PageSizes } from 'pdf-lib'
import fontkit from "@pdf-lib/fontkit";
import printJS from 'print-js'


export const useSalesStore = defineStore('sales', {
    state: () => ({
        sales: [] as Sale[],
        sale: {
            products: [] as SaleProduct[],
            status: 'confirmed' as Sale['status'],
            discount_amount: 0,
            discount_percentage: 0,
            total_amount: 0,
            subtotal_amount: 0,
        } as Sale,
        saleStatus: {
            loading: false,
            success: false,
            error: false,
            message: '',
        } as Status,
        salesStatus: {
            loading: false,
            success: false,
            error: false,
            message: '',
        } as Status,
        pagination: {
            currentPage: 0,
            firstPageUrl: '',
            lastPageUrl: '',
            nextPageUrl: '',
            prevPageUrl: '',
            lastPage: 0,
            perPage: 0,
            total: 0,
        } as Pagination,
    }),

    getters: {
        getSales: (state) => state.sales,
        getSale: (state) => state.sale,
        getSaleFromSales: (state) => (id: number) => {
            return state.sales.find((sale) => sale.id === id)
        },
    },
    actions: {
        async fetchSalesOfCustomer(page = 1, id: number, search = "") {
            this.clearSalesStatus();
            try {
                this.salesStatus.loading = true;
                const { data: response } = await customers.getCustomerSales(id, page, search);
                this.sales = response.data.data.map((sale: any) => {
                    return {
                        ...sale,
                        products: sale.products.map((product: any) => {
                            const flattenedProduct = { ...product, ...product.pivot };
                            delete flattenedProduct.pivot;
                            return flattenedProduct;
                        }),
                    };
                });
                this.pagination = {
                    currentPage: response.data.current_page,
                    firstPageUrl: response.data.first_page_url,
                    lastPageUrl: response.data.last_page_url,
                    nextPageUrl: response.data.next_page_url,
                    prevPageUrl: response.data.prev_page_url,
                    lastPage: response.data.last_page,
                    perPage: response.data.per_page,
                    total: response.data.total,
                }
                this.salesStatus.success = true;
            } catch (error) {
                this.handleSalesError(error);
                throw error;
            } finally {
                this.salesStatus.loading = false;
            }
        },
        async createSale(sale: Sale) {
            this.clearSaleStatus();
            try {
                this.saleStatus.loading = true;
                const { data: response } = await sales.createSale(sale);
                this.sale = response.data;
                this.sales.unshift({
                    ...response.data,
                    products: sale.products
                })
                this.saleStatus.success = true;
            } catch (error) {
                this.handleSaleError(error);
                throw error;
            } finally {
                this.saleStatus.loading = false;
            }
        },
        async updateSale(sale: Sale) {
            this.clearSaleStatus();
            try {
                this.saleStatus.loading = true;
                const { data: response } = await sales.updateSale(sale.id, sale);
                this.sale = response.data;
                this.saleStatus.success = true;
            } catch (error) {
                this.handleSaleError(error);
                throw error;
            } finally {
                this.saleStatus.loading = false;
            }
        },

        addProductToSale(product: Product) {
            const id = product.id;
            const productIndex = this.sale.products.findIndex((product) => product.id === id);
            if (productIndex !== -1) {
                this.sale.products[productIndex].quantity! += 1;
            } else {
                const saleProduct: SaleProduct = {
                    ...product,
                    product_id: product.id,
                    quantity: 1,
                    sale_id: this.sale.id,
                    subtotal: product.price,
                    total: product.price,
                    unit_price: product.price,
                    discount_amount: 0,
                    discount_percentage: 0,
                }
                this.sale.products.push(saleProduct);
            }
        },

        removeProductFromSale(id: number) {
            const productIndex = this.sale.products.findIndex((product) => product.product_id === id);
            if (productIndex !== -1) {
                this.sale.products.splice(productIndex, 1);
            }
        },

        setSale(sale: Sale) {
            this.sale = sale;
        },

        setInitialSale() {
            this.sale = {
                products: [] as SaleProduct[],
                status: 'confirmed' as Sale['status'],
                discount_amount: 0,
                discount_percentage: 0,
                customer_id: this.sale.customer_id,
            } as Sale;
        },
        async createSalePDF(sale: Sale, customerName: string): Promise<Uint8Array> {
            const fontBytes = await fetch('./fonts/arabicFont.ttf').then((res) => res.arrayBuffer());
            const pdfDoc = await PDFDocument.create();
            // width , height
            pdfDoc.registerFontkit(fontkit);
            const customFont = await pdfDoc.embedFont(fontBytes);
            const page = pdfDoc.addPage(PageSizes.A4);
            const { width, height } = page.getSize();
            const fontSize = 20;
            page.setFont(customFont);

            page.drawText('المبيعات', { x: 285, y: height - 2 * fontSize, size: fontSize });
            page.drawText('العميل', { x: 50, y: height - 4 * fontSize, size: fontSize });
            page.drawText(customerName, { x: 50, y: height - 6 * fontSize, size: fontSize });
            page.drawText('التاريخ', { x: 285, y: height - 4 * fontSize, size: fontSize });
            page.drawText(sale.created_at ?? String(new Date()), { x: 285, y: height - 6 * fontSize, size: fontSize });
            page.drawText('الحالة', { x: 50, y: height - 8 * fontSize, size: fontSize });
            page.drawText(sale.status, { x: 50, y: height - 10 * fontSize, size: fontSize });
            page.drawText('المجموع الجزئي', { x: 285, y: height - 8 * fontSize, size: fontSize });
            page.drawText(sale.subtotal_amount.toString(), { x: 285, y: height - 10 * fontSize, size: fontSize });
            page.drawText('الخصم', { x: 50, y: height - 12 * fontSize, size: fontSize });
            page.drawText(sale.discount_amount.toString(), { x: 50, y: height - 14 * fontSize, size: fontSize });
            page.drawText('المجموع', { x: 285, y: height - 12 * fontSize, size: fontSize });
            page.drawText(sale.total_amount.toString(), { x: 285, y: height - 14 * fontSize, size: fontSize });
            page.drawText('الملاحظات', { x: 50, y: height - 16 * fontSize, size: fontSize });
            page.drawText(sale.note ?? '', { x: 50, y: height - 18 * fontSize, size: fontSize });

            this.drawTable(page, 50, height - 20 * fontSize, sale.products, fontSize - 10);
            const pdfBytes = await pdfDoc.save();
            return pdfBytes;
        },
        drawTable(page: PDFPage, x: number, y: number, data: SaleProduct[], fontSize = 10) {
            const columnWidths = [100, 100, 100, 100, 100, 100];
            const tableHeader = ['المنتج', 'الكمية', 'السعر', 'الإجمالي', 'الخصم', 'المجموع'];

            // Draw table header
            y -= 2 * fontSize;
            columnWidths.forEach((width, index) => {
                page.drawText(tableHeader[index], {
                    x: x + (index * width),
                    y,
                    size: fontSize,
                });
            });
            data.forEach((product) => {
                if (y < 50) {
                    page = page.doc.addPage();
                    y = page.getHeight() - 2 * fontSize;
                }
                y -= 2 * fontSize;
                const rowData = [
                    product.name,
                    product.quantity!.toString(),
                    product.price!.toString(),
                    product.subtotal!.toString(),
                    product.discount_amount!.toString(),
                    product.total!.toString(),
                ];

                columnWidths.forEach((width, index) => {
                    page.drawText(rowData[index], {
                        x: x + (index * width),
                        y,
                        size: fontSize,
                    });
                });
            });
        },

        async printSale(data: Sale, customerName: string) {
            const pdfBytes = await this.createSalePDF(data, customerName);
            const blob = new Blob([pdfBytes], { type: 'application/pdf' });
            const url = window.URL.createObjectURL(blob);
            printJS(url), { type: 'pdf', showModal: false };
        },

        reCalculateSaleAfterChange() {
            const initialNumber = Number();
            if (this.sale.products && this.sale.products.length > 0) {
                this.sale.products.forEach((product: SaleProduct) => {
                    if (product.discount_amount) {
                        product.discount_percentage = calculateDiscountPercentage(product.subtotal, product.discount_amount, 1);
                    }
                    if (product.quantity) {
                        product.subtotal = calculateSubtotal(product.quantity, product.unit_price, 1);
                        product.total = calculateTotal(product.subtotal, product.discount_amount, 1);
                        product.discount_percentage = calculateDiscountPercentage(product.subtotal, product.discount_amount, 1);
                    }
                });
                const total = sumTotal(this.sale.products, 'total');
                const subtotal = sumTotal(this.sale.products, 'subtotal');
                this.sale.total_amount = total
                this.sale.subtotal_amount = subtotal
                if (this.sale.discount_amount) {
                    this.sale.discount_percentage = calculateDiscountPercentage(this.sale.subtotal_amount, this.sale.discount_amount, 1);
                    this.sale.total_amount = total - this.sale.discount_amount;
                } else {
                    this.sale.discount_amount = initialNumber;
                    this.sale.discount_percentage = initialNumber;
                }
            } else {
                this.sale.total_amount = initialNumber;
                this.sale.subtotal_amount = initialNumber;
                this.sale.discount_amount = initialNumber;
                this.sale.discount_percentage = initialNumber;
            }
        },
        clearSalesStatus() {
            this.salesStatus = {
                loading: false,
                error: false,
                success: false,
                message: '',
            }
        },
        clearSaleStatus() {
            this.saleStatus = {
                loading: false,
                error: false,
                success: false,
                message: '',
            }
        },
        handleSalesError(error: any) {
            this.salesStatus.error = true;
            if (!error.response) {
                this.salesStatus.message = 'حدث خطأ في الشبكة'
            } else if (error.response.status === 500) {
                this.salesStatus.message = 'حدث خطأ في الخادم';
            } else {
                this.salesStatus.message = 'حدث خطأ ما'
            }
        },
        handleSaleError(error: any) {
            this.saleStatus.error = true;
            if (!error.response) {
                this.saleStatus.message = 'حدث خطأ في الشبكة'
            } else if (error.response.status === 500) {
                this.saleStatus.message = 'حدث خطأ في الخادم';
            } else {
                this.saleStatus.message = 'حدث خطأ ما'
            }
        },
    }
})