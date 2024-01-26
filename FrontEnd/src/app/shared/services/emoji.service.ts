import { Injectable } from '@angular/core'

@Injectable({ providedIn: 'root' })

export class EmojiService {

    public getEmoji(emoji: string): string {
        switch (emoji.toLowerCase()) {
            case 'error': return '❌'
            case 'blue': return '🟪'
            case 'green': case 'true': return '🟩'
            case 'orange': return '🟧'
            case 'red': case 'false': return '🟥'
            case 'yellow': return '🟨'
        }

    }

}
