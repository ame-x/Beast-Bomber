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
    select.addEventListener('change', handler)
    handler()
}
{
    const token = ezSelector('#token')
    token.addEventListener('change', ({ target }) => {
        if (DiscordToken.validate.token(target.value)) return
        target.value = ''
        alert('Invalid Token')
        target.focus()
    })
    ezSelector('#send-btn').addEventListener('click', async ({ target }) => {
        if (token.value.length === 0) {
            alert('Token is Empty')
            token.focus()
            return
        }
    })
}
{
    const channelid = ezSelector('#channelid'),
        content = ezSelector('#content')
    channelid.addEventListener('change', ({ target }) => {
        const arr = []
        for (const v of channelid.value.split('\n')) {
            if (DiscordToken.validate.channelid(v)) arr.push(v)
        }
        target.value = arr.join('\n')
        target.focus()
    })
    ezSelector('#send-btn').addEventListener('click', async ({ target }) => {
        if (token.value.length === 0) {
            alert('Token is Empty')
            tokenInput.focus()
            return
        }
        if (channelid.value.length === 0) {
            alert('Channel ID is Empty')
            channelid.focus()
            return
        }
        time.sleep(delay)
