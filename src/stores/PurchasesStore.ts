import { purchases } from '@/services/api'
import { defineStore } from 'pinia'
import type { Status, Pagination, Purchase, PurchaseRawMaterial, RawMaterial } from '@/Types'
import { PDFDocument, PDFPage, PageSizes, encodeToBase64 } from 'pdf-lib'
import fontkit from "@pdf-lib/fontkit";
import printJS from 'print-js'

export const usePurchasesStore = defineStore('purchases', {
    state: () => ({
        purchases: [] as Purchase[],
        purchase: {
            raw_materials: [] as PurchaseRawMaterial[],
            status: 'confirmed' as Purchase['status'],
            discount_amount: 0,
            discount_percentage: 0,
        } as Purchase,
        purchaseStatus: {
            loading: false,
            error: false,
            success: false,
            message: '',
        } as Status,
        purchasesStatus: {
            loading: false,
            error: false,
            success: false,
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
        } as Pagination

    }),
    getters: {
        getPurchases: (state) => state.purchases,
        getPurchase: (state) => state.purchase,
        getPurchaseFromPurchases: (state) => (id: number) => {
            return state.purchases.find((purchase) => purchase.id === id)
        },
    },
    actions: {
        async fetchPurchases(page = 1) {
            this.clearPurchasesStatus();
            try {
                this.purchasesStatus.loading = true
                const { data: response } = await purchases.getPurchases(page)
                this.purchases = response.data.data
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
                this.purchasesStatus.success = true
            } catch (error) {
                this.handlePurchasesError(error)
                throw error
            }
            finally {
                this.purchasesStatus.loading = false
            }
        },
        async fetchPurchasesBySupplier(page: number, id: number , search="") {
            this.clearPurchasesStatus();
            try {
                this.purchasesStatus.loading = true
                const { data: response } = await purchases.getPurchasesBySupplier(page, id, search)
                this.purchases = response.data.data.map((purchase: any) => {
                    return {
                        ...purchase,
                        raw_materials: purchase.raw_materials.map((rawMaterial: any) => {
                            const flattenedRawMaterial = { ...rawMaterial, ...rawMaterial.pivot };
                            delete flattenedRawMaterial.pivot;
                            return flattenedRawMaterial;
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
                this.purchasesStatus.success = true
            } catch (error) {
                this.handlePurchasesError(error)
                throw error
            }
            finally {
                this.purchasesStatus.loading = false
            }
        },
        async createPurchase(purchase: Purchase) {
            this.clearPurchaseStatus();
            try {
                this.purchaseStatus.loading = true
                const { data: response } = await purchases.createPurchase(purchase)
                this.purchases.unshift({
                    ...response.data,
                    raw_materials: purchase.raw_materials
                })
                this.purchaseStatus.success = true
            } catch (error) {
                this.handlePurchaseError(error)
                throw error
            } finally {
                this.purchaseStatus.loading = false
            }
        },
        async updatePurchase(purchase: Purchase) {
            this.clearPurchaseStatus();
            try {
                this.purchaseStatus.loading = true
                const { data: response } = await purchases.updatePurchase(purchase.id, purchase)
                this.purchaseStatus.success = true
            } catch (error) {
                this.handlePurchaseError(error)
                throw error
            } finally {
                this.purchaseStatus.loading = false
            }
        },
        addRawMaterialToPurchase(rawMaterial: RawMaterial) {
            const id = rawMaterial.id;
            const rawMaterialIndex = this.purchase.raw_materials.findIndex((rawMaterial) => rawMaterial.raw_material_id === id)
            if (rawMaterialIndex !== -1) {
                this.purchase.raw_materials[rawMaterialIndex].quantity! += 1
            } else {
                const purchaseRawMaterial: PurchaseRawMaterial = {
                    ...rawMaterial,
                    raw_material_id: rawMaterial.id,
                    quantity: 1,
                    purchase_id: this.purchase.id,
                    subtotal: rawMaterial.cost,
                    total: rawMaterial.cost,
                    unit_price: rawMaterial.cost,
                    discount_amount: 0,
                    discount_percentage: 0,
                }
                this.purchase.raw_materials.push(purchaseRawMaterial)
            }
        },
        removeRawMaterialFromPurchase(id: number) {
            const rawMaterialIndex = this.purchase.raw_materials.findIndex((rawMaterial) => rawMaterial.raw_material_id === id)
            if (rawMaterialIndex !== -1) {
                this.purchase.raw_materials.splice(rawMaterialIndex, 1)
            }
        },
        setPurchase(purchase: Purchase) {
            this.purchase = purchase
        },
        async createPurchasePDF(purchase: Purchase, supplierName: string): Promise<Uint8Array> {
            const fontBytes = await fetch('./fonts/arabicFont.ttf').then((res) => res.arrayBuffer());
            const pdfDoc = await PDFDocument.create();
            // width , height
            pdfDoc.registerFontkit(fontkit);
            const customFont = await pdfDoc.embedFont(fontBytes);
            const page = pdfDoc.addPage(PageSizes.A4);
            const { width, height } = page.getSize();
            const fontSize = 20;
            page.setFont(customFont);

            page.drawText('المشتريات', { x: 285, y: height - 2 * fontSize, size: fontSize });
            page.drawText('المورد', { x: 50, y: height - 4 * fontSize, size: fontSize });
            page.drawText(supplierName, { x: 50, y: height - 6 * fontSize, size: fontSize });
            page.drawText('التاريخ', { x: 285, y: height - 4 * fontSize, size: fontSize });
            page.drawText(purchase.created_at??String(new Date()), { x: 285, y: height - 6 * fontSize, size: fontSize });
            page.drawText('الحالة', { x: 50, y: height - 8 * fontSize, size: fontSize });
            page.drawText(purchase.status, { x: 50, y: height - 10 * fontSize, size: fontSize });
            page.drawText('المجموع الجزئي', { x: 285, y: height - 8 * fontSize, size: fontSize });
            page.drawText(purchase.subtotal_amount.toString(), { x: 285, y: height - 10 * fontSize, size: fontSize });
            page.drawText('الخصم', { x: 50, y: height - 12 * fontSize, size: fontSize });
            page.drawText(purchase.discount_amount.toString(), { x: 50, y: height - 14 * fontSize, size: fontSize });
            page.drawText('المجموع', { x: 285, y: height - 12 * fontSize, size: fontSize });
            page.drawText(purchase.total_amount.toString(), { x: 285, y: height - 14 * fontSize, size: fontSize });
            page.drawText('الملاحظات', { x: 50, y: height - 16 * fontSize, size: fontSize });
            page.drawText(purchase.note ?? '', { x: 50, y: height - 18 * fontSize, size: fontSize });

            this.drawTable(page, 50, height - 20 * fontSize, purchase.raw_materials, fontSize - 10);
            const pdfBytes = await pdfDoc.save();
            return pdfBytes;
        },
        drawTable(page: PDFPage, x: number, y: number, data: PurchaseRawMaterial[], fontSize = 10) {
            const columnWidths = [100, 100, 100, 100, 100, 100];
            const tableHeader = ['المادة الخام', 'الكمية', 'السعر', 'الإجمالي', 'الخصم', 'المجموع'];

            // Draw table header
            y -= 2 * fontSize;
            columnWidths.forEach((width, index) => {
                page.drawText(tableHeader[index], {
                    x: x + (index * width),
                    y,
                    size: fontSize,
                });
            });
            data.forEach((rawMaterial) => {
                if (y < 50) {
                    page = page.doc.addPage();
                    y = page.getHeight() - 2 * fontSize;
                }
                y -= 2 * fontSize;
                const rowData = [
                    rawMaterial.name,
                    rawMaterial.quantity!.toString(),
                    rawMaterial.unit_price!.toString(),
                    rawMaterial.subtotal!.toString(),
                    rawMaterial.discount_amount!.toString(),
                    rawMaterial.total!.toString(),
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
        async printPurchase(purchase: Purchase, supplierName: string) {
            const pdfBytes = await this.createPurchasePDF(purchase, supplierName);
            const blob = new Blob([pdfBytes], { type: 'application/pdf' });
            const url = window.URL.createObjectURL(blob);
            printJS(url), { type: 'pdf', showModal: false };
        },
        handlePurchasesError(error: any) {
            this.purchasesStatus.error = true
            if (!error.response) {
                this.purchasesStatus.message = 'حدث خطأ في الشبكة'
            } else if (error.response.status === 500) {
                this.purchasesStatus.message = 'حدث خطأ في الخادم';
            } else {
                this.purchasesStatus.message = 'حدث خطأ ما'
            }
        },
        handlePurchaseError(error: any) {
            this.purchaseStatus.error = true
            if (!error.response) {
                this.purchaseStatus.message = 'حدث خطأ في الشبكة'
            } else if (error.response.status === 500) {
                this.purchaseStatus.message = 'حدث خطأ في الخادم';
            } else {
                this.purchaseStatus.message = 'حدث خطأ ما'
            }
        },
        clearPurchasesStatus() {
            this.purchasesStatus = {
                loading: false,
                error: false,
                success: false,
                message: '',
            }
        },
        clearPurchaseStatus() {
            this.purchaseStatus = {
                loading: false,
                error: false,
                success: false,
                message: '',
            }
        },
        setInitialPurchase() {
            this.purchase = {
                raw_materials: [] as PurchaseRawMaterial[],
                status: 'confirmed' as Purchase['status'],
                supplier_id: this.purchase.supplier_id,
            } as Purchase
        }

    }

})




