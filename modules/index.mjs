'use strict'
import { hsl2rgb } from './hsl2rgb.mjs'
import { DiscordToken } from './discordtoken.mjs'

const ezSelector = query => query instanceof Element
    ? query
    : typeof query === 'string'
        ? (query[0] === '#'
            ? document.getElementById(query.slice(1))
            : query[0] === '.'
                ? document.getElementsByClassName(query.slice(1))
                : document.getElementsByTagName(query))
        : null
const sleep = (delay = 0) => new Promise(resolve => setTimeout(resolve, Math.min(Number.MAX_SAFE_INTEGER, Math.max(
    0, typeof delay !== 'number' || Number.isNaN(delay) ? 0 : delay
))))
{
    const handler = () => void (ezSelector('.wrap')[0].style.paddingBottom
        = ezSelector('.footer-container')[0].offsetHeight + 'px')
    window.addEventListener('resize', handler)
    handler()
}
ezSelector('#legacy-version-info-close').addEventListener('click', ({ target }) => void target.parentNode.parentNode.removeChild(target.parentNode))
const tokenInput = ezSelector('#token-input')
{
    tokenInput.addEventListener('change', ({ target }) => {
        if (DiscordToken.validate.token(target.value)) return
        target.value = ''
        alert('Invalid Token Format.')
        target.focus()
    })
    ezSelector('#send-btn').addEventListener('click', async ({ target }) => {
        if (tokenInput.value.length === 0) {
            alert('Token is not entered.')
            tokenInput.focus()
            return
        }
    })
}
{
    const channelIdInput = ezSelector('#channelid-input'),
        contentInput = ezSelector('#content-input')
    channelIdInput.addEventListener('change', ({ target }) => {
        const arr = []
        for (const v of channelIdInput.value.split('\n')) {
            if (DiscordToken.validate.channelId(v)) arr.push(v)
        }
        target.value = arr.join('\n')
        target.focus()
    })
        if (channelIdInput.value.length === 0) {
            alert('Channel ID is not entered.')
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
            }
        }
        target.disabled = false
    })
}
