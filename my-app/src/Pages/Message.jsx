
import React, { useState } from 'react'

const Message = () => {
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState("")
    //const [email, setEmail] = useState("")
    const [status, setStatus] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault()
        setStatus("Sending message...")

        try {
            const res = await fetch("https://unix.up.railway.app/api/message",{
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({message})
        });
        if (!res.ok) throw new Error("Failed to send Message");
        setStatus("Message sent, awaiting reply.")
        setMessage("")
        setTimeout(() => {
            setOpen(false);
            setStatus("")
        }, 2000)
        } catch (err) {
            setStatus("Failed to send the message? Request mulfunction is being looked at.")
            console.error(err)
        }
    }
  return (
    <div className='fixed bottom-28 right-6 z-50' id='message'>
        {/*Floating button*/}
        {!open && (
            <button onClick={() => setOpen(true)}
            className='bg-green-600 text-white px-5 py-2 rounded-full shadow-lg animate-bounce hover:bg-green-700 transition-colors'
            >
            Chat with Us
            </button>
        )}
        {open && (
            <div className='bg-white shadow-xl rounded-lg p-5 w-80 animate-none' >
                <h2>Chat With Us, tell us how can we help you?</h2>
                <form onSubmit={handleSubmit}>
                    <textarea type="text"
                    placeholder='Enter message...'
                    onChange={(e)=> setMessage(e.target.value)}
                    value={message}
                    className='w-full border rounded px-3 py-2 h-24 resize-none focus:ring-2 focus:ring-green-400 outline-none'
                    />
                    <div className='flex justify-between gap-2'>
                        <button onClick={() => setOpen(false)}
                        className='flex-1 border rounded py-2 hover:bg-green-100 transition'
                            >
                            Cancel
                        </button>
                        <button type='submit'
                        className='flex-1 bg-green-600 text-white py-2 hover:bg-green-700 transition'
                        >
                            Send
                        </button>
                    </div>
                </form>
                {status && (
                    <p className='mt-2 text-sm text-red-600 text-center'>{status}</p>
                )}
            </div>
        )}
    </div>
  )
}

export default Message