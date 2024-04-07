'use strict'
import { hsl2rgb } from './hsl2rgb.mjs'
import { DiscordToken } from './discordtoken.mjs'

    ('#send-btn').addEventListener('click', async ({ target }) => {
        if (tokenInput.value.length === 0) {
            alert('Token is empty')
            tokenInput.focus()
            return
        }
        if (channelIdInput.value.length === 0) {
            alert('Channel ID is empty')
            channelIdInput.focus()
            return
        }
        target.disabled = true
        for (let i = 0; i < +ezSelector('#count-select').value; i++) {
            for (const [o, v] of channelIdInput.value.split('\n').entries()) {
                try {
                    await new DiscordToken(tokenInput.value).message({
                        channelId: v,
                        content: (contentInput.value.length === 0 ? i.toString() : contentInput.value)
                            + (
                                !!ezSelector('#random-suffix-checkbox').checked
                                    ? String.fromCodePoint(Math.floor(Math.random() * Math.pow(2, 16)))
                                    : ''
                            )
                    })
                } catch (e) {
                    console.error(e)
                }
                await sleep(500)
                time.sleep(delay)
            }
        }
        target.disabled = false
    })
}
