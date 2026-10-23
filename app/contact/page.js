
"use client"

import React, { useState } from 'react'

export default function Contact() {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [message, setMessage] = useState("")
    const [success, setSuccess] = useState("")

    const handleSubmit = (e) => {
        e.preventDefault()

        setSuccess("Thank you! Your message has been received.")

        setName("")
        setEmail("")
        setMessage("")
    }


    return (
        <main className="bg-green-200 min-h-screen flex items-center justify-center p-4 sm:p-6">

            <section className="bg-white rounded-2xl shadow-lg p-5 sm:p-8 w-full max-w-lg mx-auto">

                <h1 className="text-2xl sm:text-3xl font-bold text-green-700 text-center">
                    Contact Us
                </h1>

                <p className="text-gray-600 text-center mt-3 mb-6 text-sm sm:text-base">
                    Have a question? Send us a message!
                </p>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">

                    <input
                        type="text"
                        placeholder="Enter your name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className="w-full min-w-0 border border-gray-300 rounded-lg px-4 py-3 outline-green-600"
                    />

                    <input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="w-full min-w-0 border border-gray-300 rounded-lg px-4 py-3 outline-green-600"
                    />

                    <textarea
                        placeholder="Write your message"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        required
                        rows={4}
                        className="w-full min-w-0 border border-gray-300 rounded-lg px-4 py-3 outline-green-600"
                    />

                    <button
                        type="submit"
                        className="w-full bg-green-600 text-white font-bold py-3 rounded-full hover:bg-green-700 transition"
                    >
                        Send Message
                    </button>

                    {success && (
                        <p className="text-green-700 text-center font-semibold break-words">
                            {success}
                        </p>
                    )}

                </form>

            </section>

        </main>
    )

}

