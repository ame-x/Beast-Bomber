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

    
      
        }, 50)



    });
});
