import { Injectable } from '@angular/core'

@Injectable({ providedIn: 'root' })

export class EmojiService {

    public getEmoji(emoji: string): string {
        switch (emoji) {
            case 'error': return '❌'
            case 'green-box': return '🟩'
            case 'yellow-box': return '🟨'
            case 'red-box': return '🟥'
        }

    }

}
