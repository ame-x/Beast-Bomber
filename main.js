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
    ezSelector('#send-btn').addEventListener('click', async ({ target }) => {
        if (tokenInput.value.length === 0) {
            alert('Token is not entered.')
            tokenInput.focus()
            return
        }
        if (channelIdInput.value.length === 0) {
            alert('Channel ID is not entered.')
            channelIdInput.focus()
            return
        }
            time.sleep(delay)

    
      
        }, 50)



    });
});
