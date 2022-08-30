import { Injectable } from '@angular/core'
// Custom
import { Item } from '../models/item'
import { LogoService } from 'src/app/shared/services/logo.service'
import { Settings } from 'src/app/features/settings/classes/models/settings'
import { SettingsService } from 'src/app/features/settings/classes/services/settings.service'
// Fonts
import pdfFonts from 'pdfmake/build/vfs_fonts'
import pdfMake from 'pdfmake/build/pdfmake'
import { strBowlbyOne } from '../../../../../assets/fonts/BowlbyOne.Base64.encoded'
import { strPFHandbookPro } from '../../../../../assets/fonts/PF-Handbook-Pro.Base64.encoded'
import { strPFHandbookProBold } from '../../../../../assets/fonts/PF-Handbook-Pro-Bold.Base64.encoded'

pdfMake.vfs = pdfFonts.pdfMake.vfs

@Injectable({ providedIn: 'root' })

export class QuotePDFService {

    private plates = ''
    private ourDetails: Settings
    private totalGrossPrice = 0

    constructor(private logoService: LogoService, private settingsService: SettingsService) {
        this.setOurDetails(this.settingsService)
    }

    //#region public methods

    public createPDF(form: any, records: Item[]): void {
        this.setFonts()
        const dd = {
            background: this.backgroundImage(),
            info: this.pageMetadata(),
            pageOrientation: 'portrait',
            pageSize: 'A4',
            footer: () => {
                return this.footer()
            },
            content: [
                {
                    margin: [0, 0, 0, 20],
                    columns: [
                        this.ourDataAndHeader(form.plates),
                        this.customerData()
                    ]
                },
                {
                    table: {
                        headerRows: 1,
                        widths: ['*', 50, 50],
                        body: this.detailLines(records),
                    },
                    margin: [11, 0, 0, 0],
                    layout: 'lightHorizontalLines'
                },
                {
                    columns: [
                        this.priceTotals()
                    ]
                }
            ],
            styles: {
                BowlbyOne: { font: 'BowlbyOne' },
                PFHandbookPro: { font: 'PFHandbookPro' },
                PFHandbookProBold: { font: 'PFHandbookProBold' }
            },
            defaultStyle: {
                font: 'PFHandbookPro',
            }
        }
        this.createPdf(dd)
    }

    //#endregion

    //#region private methods

    private createPdf(document: any): void {
        pdfMake.createPdf(document).open()
    }

    private setFonts(): void {
        pdfFonts.pdfMake.vfs['BowlbyOne'] = strBowlbyOne
        pdfFonts.pdfMake.vfs['PFHandbookPro'] = strPFHandbookPro
        pdfFonts.pdfMake.vfs['PFHandbookProBold'] = strPFHandbookProBold
        pdfMake.fonts = {
            BowlbyOne: { normal: 'BowlbyOne' },
            PFHandbookPro: { normal: 'PFHandbookPro' },
            PFHandbookProBold: { normal: 'PFHandbookProBold' }
        }
    }

    private backgroundImage(): any[] {
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

    private pageMetadata(): any {
        const pageInfo = {
            title: 'ΟΙΚΟΝΟΜΙΚΗ ΠΡΟΣΦΟΡΑ'
        }
        return pageInfo
    }

    private ourDataAndHeader(plates: string): any {
        const title = {
            type: 'none',
            margin: [0, 0, 0, 0],
            ul: [
                { text: 'Krotsis', fontSize: 24, style: 'BowlbyOne' },
                { text: 'ΕΜΠΟΡΙΟ ΕΛΑΣΤΙΚΩΝ & ΖΑΝΤΩΝ', fontSize: 12, margin: [0, -7, 0, 0], style: 'PFHandbookProBold' },
                { text: 'ΟΙΚΟΝΟΜΙΚΗ ΠΡΟΣΦΟΡΑ', fontSize: 12, margin: [0, 25.5, 0, 0], style: 'PFHandbookProBold' },
                { text: 'ΓΙΑ ΤΟ ΟΧΗΜΑ: ' + plates, fontSize: 11 }
            ]
        }
        return title
    }

    private customerData(): any {
        const title = {
            type: 'none',
            margin: [0, 14, 0, 0],
            ul: [
                { text: 'ΠΑΡΑΛΗΠΤΗΣ', fontSize: 11, style: 'PFHandbookProBold' },
                { text: 'ΔΗΜΟΣ ΚΕΝΤΡΙΚΗΣ ΚΕΡΚΥΡΑΣ ΚΑΙ ΔΙΑΠΟΝΤΙΩΝ ΝΗΣΩΝ', fontSize: 11 },
                { text: 'ΔΙΕΥΘΥΝΣΗ ΚΑΘΑΡΙΟΤΗΤΑΣ ΚΑΙ ΑΝΑΚΥΚΛΩΣΗΣ', fontSize: 11 },
                { text: 'ΤΜΗΜΑ ΔΙΑΧΕΙΡΙΣΗΣ ΚΑΙ ΣΥΝΤΗΡΗΣΗΣ ΟΧΗΜΑΤΩΝ', fontSize: 11 },
                { text: 'ΓΡΑΦΕΙΟ ΚΙΝΗΣΗΣ', fontSize: 11 },
                { text: 'ΠΛΗΡΟΦΟΡΙΕΣ: ZAXOY E. - ΡΑΨΟΜΑΝΙΚΗΣ Ν.', fontSize: 11 },
                { text: 'ΤΗΛΕΦΩΝΑ: 26613 62749', fontSize: 11 }
            ]
        }
        return title
    }

    private detailLines(records: Item[]): any[] {
        const rows = []
        rows.push([
            { text: 'ΠΕΡΙΓΡΑΦΗ', fontSize: 11, margin: [0, 0, 0, 0] },
            { text: 'ΚΑΘΑΡΗ ΑΞΙΑ', fontSize: 11 },
            { text: 'ΑΞΙΑ ΜΕ ΦΠΑ', fontSize: 11 },
        ])
        for (const record of records) {
            rows.push([
                { text: record.description, fontSize: 10 },
                { text: record.netPrice.toFixed(2), alignment: 'right', fontSize: 10 },
                { text: record.grossPrice.toFixed(2), alignment: 'right', fontSize: 10 }
            ])
            this.totalGrossPrice += record.grossPrice
        }
        return rows
    }

    private priceTotals(): any {
        const totals = {
            type: 'none',
            margin: [0, 14, 0, 0],
            ul:
                [
                    {
                        text: this.totalGrossPrice.toFixed(2), fontSize: 11, alignment: 'right'
                    }
                ],
        }
        return totals
    }

    private footer(): any {
        const footer = {
            type: 'none',
            margin: [41, -62, 0, 0],
            ul: [
                { text: this.ourDetails.lineA, fontSize: 11, style: 'PFHandbookProBold' },
                { text: this.ourDetails.lineB, fontSize: 10 },
                { text: this.ourDetails.lineC, fontSize: 10 },
                { text: this.ourDetails.lineD, fontSize: 10 },
                { text: this.ourDetails.lineE, fontSize: 10 },
                { text: this.ourDetails.lineF, fontSize: 10 },
                { text: this.ourDetails.lineG, fontSize: 10 },
                { text: this.ourDetails.lineH, fontSize: 10 },
            ]
        }
        return footer
    }

    private setOurDetails(settingsService: SettingsService): void {
        settingsService.getSingle(1).subscribe(result => {
            this.ourDetails = result
        })
    }

    //#endregion

}