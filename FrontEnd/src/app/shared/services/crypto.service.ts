import { Injectable } from '@angular/core'
import *  as CryptoJS from 'crypto-js'

@Injectable({ providedIn: 'root' })

export class CryptoService {

    private key = '10140274-a7b1-4fd8-bc99-7bd267f385a0'

    constructor() { }

    public encrypt(txt: string): string {
        return CryptoJS.AES.encrypt(txt.toString(), this.key).toString()
    }

    public decrypt(txtToDecrypt: string): string {
        return CryptoJS.AES.decrypt(txtToDecrypt, this.key).toString(CryptoJS.enc.Utf8)
    }

}
