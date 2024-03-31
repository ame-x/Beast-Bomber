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
{
    const select = ezSelector('#tool-select'),
        handler = () => {
            const e = ezSelector('#checkalive-result')
            e.classList.remove('checkalive-result-show', 'checkalive-result-alive', 'checkalive-result-dead')
            e.classList.add('checkalive-result-hide')
            for (const e of ezSelector('.content-item')) e.style.display = e.id.slice(0, -5) === select.value
                ? 'block'
                : 'none'
        }
    select.addEventListener('change', handler)
    handler()
}
ezSelector('#legacy-version-info-close').addEventListener('click', ({ target }) => void target.parentNode.parentNode.removeChild(target.parentNode))
const tokenInput = ezSelector('#token-input')
{
    tokenInput.addEventListener('change', ({ target }) => {
        if (DiscordToken.validate.token(target.value)) return
        target.value = ''
        alert('Invalid Token')
        target.focus()
    })
    ezSelector('#checkalive-btn').addEventListener('click', async ({ target }) => {
        if (tokenInput.value.length === 0) {
            alert('Token is empty')
            tokenInput.focus()
            return
        }
        const e = ezSelector('#checkalive-result')
        e.classList.remove('checkalive-result-show', 'checkalive-result-alive', 'checkalive-result-dead')
        e.classList.add('checkalive-result-hide')
        target.disabled = true
        const result = await new DiscordToken(tokenInput.value).checkAlive()
        e.textContent = result
            ? 'Token has been determined to be alive.'
            : 'Token has been determined to be dead.'
        e.classList.remove('checkalive-result-hide')
        e.classList.add(
            'checkalive-result-show',
            result
                ? 'checkalive-result-alive'
                : 'checkalive-result-dead'
        )
        target.disabled = false
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
    ezSelector('#send-btn').addEventListener('click', async ({ target }) => {
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
