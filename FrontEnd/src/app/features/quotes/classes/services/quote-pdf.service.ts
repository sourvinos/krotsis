import { Injectable } from '@angular/core'
// Custom
import { HelperService } from 'src/app/shared/services/helper.service'
import { Item } from '../models/item'
import { LocalStorageService } from 'src/app/shared/services/local-storage.service'
import { LogoService } from 'src/app/shared/services/logo.service'
// Fonts
import pdfFonts from 'pdfmake/build/vfs_fonts'
import pdfMake from 'pdfmake/build/pdfmake'
import { strBowlbyOne } from '../../../../../assets/fonts/BowlbyOne.Base64.encoded'
import { strPFHandbookPro } from '../../../../../assets/fonts/PF-Handbook-Pro.Base64.encoded'

pdfMake.vfs = pdfFonts.pdfMake.vfs

@Injectable({ providedIn: 'root' })

export class QuotePDFService {

    constructor(private helperService: HelperService, private localStorageService: LocalStorageService, private logoService: LogoService) { }

    //#region public methods

    public createPDF(records: Item[]): void {
        this.setFonts()
        const dd = {
            background: this.setBackgroundImage(),
            info: this.setPageInfo(),
            pageOrientation: 'portrait',
            pageSize: 'A4',
            content: [
                {
                    margin: [0, 0, 0, 20],
                    columns: [
                        // this.setLogo(),
                        this.setOurData(),
                        this.setCustomerData()
                    ]
                },
                {
                    table: {
                        headerRows: 1,
                        widths: ['*', 50, 50],
                        body: this.createLines(records),
                    },
                    margin: [11, 0, 0, 0],
                    layout: 'lightHorizontalLines'
                },
                {
                    canvas: [
                        {
                            type: 'line',
                            x1: 11, y1: 580,
                            x2: 515, y2: 580,
                            lineWidth: 1
                        }
                    ]
                }
            ],
            styles: {
                BowlbyOne: { font: 'BowlbyOne' },
                PFHandbookPro: { font: 'PFHandbookPro' }
            },
            defaultStyle: {
                font: 'PFHandbookPro',
            },
            footer: () => {
                return this.setFooter()
            }
        }
        this.createPdf(dd)
    }

    //#endregion

    //#region private methods

    private createPdf(document: any): void {
        pdfMake.createPdf(document).open()
    }

    private createLines(records: Item[]): any[] {
        const rows = []
        rows.push([
            { text: 'Περιγραφή', fontSize: 6, margin: [0, 0, 0, 0] },
            { text: 'Καθαρή αξία', fontSize: 6 },
            { text: 'Αξία με ΦΠΑ', fontSize: 6 },
        ])
        for (const record of records) {
            rows.push([
                { text: record.description, fontSize: 5 },
                { text: record.netPrice, alignment: 'right', fontSize: 5 },
                { text: record.grossPrice, alignment: 'right', fontSize: 5 }
            ])
        }
        return rows
    }

    private setFonts(): void {
        pdfFonts.pdfMake.vfs['BowlbyOne'] = strBowlbyOne
        pdfFonts.pdfMake.vfs['PFHandbookPro'] = strPFHandbookPro
        pdfMake.fonts = {
            BowlbyOne: { normal: 'BowlbyOne' },
            PFHandbookPro: { normal: 'PFHandbookPro', }
        }
    }

    private setBackgroundImage(): any[] {
        const backgroundImage = [
            {
                image: this.logoService.getLogo(),
                width: '1000',
                margin: [0, 175, 0, 0],
                opacity: 0.03
            }
        ]
        return backgroundImage
    }

    private setPageInfo(): any {
        const pageInfo = {
            title: 'Οικονομική Προσφορά'
        }
        return pageInfo
    }

    private setLogo(): any {
        const logo = {
            type: 'none',
            width: 60,
            margin: [0, -6, 0, 0],
            ul: [
                { image: this.logoService.getLogo(), fit: [40, 40], alignment: 'left' },
            ]
        }
        return logo
    }

    private setOurData(): any {
        const title = {
            type: 'none',
            margin: [0, 0, 0, 0],
            ul: [
                { text: 'Krotsis',  fontSize: 24, style: 'BowlbyOne' },
                { text: 'ΕΜΠΟΡΙΟ ΕΛΑΣΤΙΚΩΝ & ΖΑΝΤΩΝ', fontSize: 12, margin: [0, -7, 0, 0] },
                { text: 'ΟΙΚΟΝΟΜΙΚΗ ΠΡΟΣΦΟΡΑ', fontSize: 11, margin: [0, 10, 0, 0] },
                { text: 'ΓΙΑ ΤΟ ΟΧΗΜΑ: ΚΗΙ 1234', fontSize: 9 },
            ]
        }
        return title
    }

    private setCustomerData(): any {
        const title = {
            type: 'none',
            margin: [0, 14, 0, 0],
            ul: [
                { text: 'ΠΑΡΑΛΗΠΤΗΣ', fontSize: 10 },
                { text: 'ΓΡΑΜΜΗ 1', fontSize: 8 },
                { text: 'ΓΡΑΜΜΗ 2', fontSize: 8 },
                { text: 'ΓΡΑΜΜΗ 3', fontSize: 8 },
                { text: 'ΓΡΑΜΜΗ 4', fontSize: 8 },
                { text: 'email@server.com', fontSize: 8 },
                { text: 'ΤΗΛΕΦΩΝΑ: 26613 65114', fontSize: 8 }                
            ]
        }
        return title
    }

    private setFooter(): any {
        const footer = {
            type: 'none',
            margin: [41, -40, 0, 0],
            ul: [
                { text: 'ΚΡΟΤΣΗΣ ΕΠΕ', fontSize: 8 },
                { text: 'ΕΜΠΟΡΙΟ ΕΛΑΣΤΙΚΩΝ & ΖΑΝΤΩΝ', fontSize: 6 },
                { text: 'ΑΦΜ: 099863549', fontSize: 6 },
                { text: 'ΔΟΥ: ΚΕΡΚΥΡΑΣ', fontSize: 6 },
                { text: 'ΕΘΝΙΚΗ ΟΔΟΣ ΚΕΡΚΥΡΑΣ - ΛΕΥΚΙΜΜΗΣ 17Α', fontSize: 6 },
                { text: 'ΠΑΓΚΡΑΤΕΪΚΑ', fontSize: 6 },
                { text: 'krotsis.elastika@hotmail.com', fontSize: 6 },
                { text: '26610 22533', fontSize: 6 },
            ]
        }
        return footer
    }

    //#endregion

}