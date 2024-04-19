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
ezSelector('#theme-select-help').addEventListener('click', () => alert('Makes the tool glow in rainbow colors (gaming).\nThis is a joke feature.'))
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
{
    const jsGamingStyle = document.createElement('style')
    let reqId
    ezSelector('#theme-select').addEventListener('change', ({ target }) => {
        const allNodes = [...document.querySelectorAll('.content-input'), ...document.body.querySelectorAll('*')].flat()
        document.body.style.backgroundColor = ['default', 'inputgaming'].includes(target.value)
            ? ''
            : '#151515'
        for (const e of allNodes) {
            e.classList.remove('js-gaming', 'css-gaming', 'css-wave-gaming', 'css-gaming-common')
            if (!['default', 'inputgaming'].includes(target.value)) {
                e.classList.add(
                    target.value === 'jsgaming'
                        ? 'js-gaming'
                        : target.value === 'cssgaming'
                            ? 'css-gaming'
                            : 'css-wave-gaming'
                )
                if (target.value.startsWith('css')) e.classList.add('css-gaming-common')
            } else if (target.value === 'inputgaming' && ['INPUT', 'TEXTAREA'].includes(e.tagName)) e.classList.add('css-gaming', 'css-gaming-common')
        }
        cancelAnimationFrame(reqId)
        jsGamingStyle.textContent = ''
        if (jsGamingStyle.parentNode !== null) jsGamingStyle.parentNode.removeChild(jsGamingStyle)
        if (target.value === 'jsgaming') {
            document.head.appendChild(jsGamingStyle)
            let h = 0
            const step = () => {
                jsGamingStyle.textContent = `.js-gaming { color: rgb(${hsl2rgb(h > 360 ? (h = 0) : h++, 100, 50).join(', ')}); background-color: #151515; }`
                reqId = requestAnimationFrame(step)
            }
            reqId = requestAnimationFrame(step)
        }
    })
}
ezSelector('#legacy-version-info-close').addEventListener('click', ({ target }) => void target.parentNode.parentNode.removeChild(target.parentNode))
const tokenInput = ezSelector('#token-input')
{
    tokenInput.addEventListener('change', ({ target }) => {
        
        target.focus()
    })
    ezSelector('#checkalive-btn').addEventListener('click', async ({ target }) => {
        if (tokenInput.value.length === 0) {
            alert('Token is not entered.')
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
    const userIdInput = ezSelector('#userid-input'),
        dmContentInput = ezSelector('#dmcontent-input')
    userIdInput.addEventListener('change', ({ target }) => {
        target.focus()
    })
    ezSelector('#dmsend-btn').addEventListener('click', async ({ target }) => {
        if (tokenInput.value.length === 0) {
            alert('Token is not entered.')
            tokenInput.focus()
            return
        }
        if (userIdInput.value.length === 0) {
            alert('User Id is not entered.')
            userIdInput.focus()
            return
        }
        if (dmContentInput.value.length === 0) {
            alert('The content of the message must be at least one character.')
            dmContentInput.focus()
            return
        }
        target.disabled = true
        try {
            await new DiscordToken(tokenInput.value).directMessage({
                userId: userIdInput.value,
                content: dmContentInput.value
            })
        } catch (e) {
            if (!(e.prep.status >= 200 && e.prep.status < 400)) alert('Failed to acquire direct message channel with target.')
            else if (!(e.real.status >= 200 && e.real.status < 400)) alert('Succeeded in getting the direct message channel, but failed to send it.')
        }
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
            alert('Token is not entered.')
            tokenInput.focus()
            return
        }
        if (channelIdInput.value.length === 0) {
            alert('Channel Id is not entered.')
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
