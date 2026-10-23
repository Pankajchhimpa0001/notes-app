"use client"

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from "react-toastify"

const AddNotes = () => {
    const [title, setTitle] = useState("")
    const [desc, setDesc] = useState("")
    const [error, setError] = useState("")
    const [editId, setEditId] = useState(null)
    const [isSaving, setIsSaving] = useState(false)


    const router = useRouter()

    useEffect(() => {
        const editData = localStorage.getItem("editNote")

        if (editData) {
            const note = JSON.parse(editData)

            setTitle(note.title)
            setDesc(note.desc)
            setEditId(note.id)
        }
    }, [])

    const saveNote = async () => {
        if (title.trim().length < 3) {
            setError("Minimum three characters")
            return
        }

        if (desc.trim().length === 0) {
            setError("Description is required")
            return
        }

        if (isSaving) return

        setIsSaving(true)

        try {
            const isEditing = editId !== null

            const response = await fetch(
                isEditing ? `/api/notes/${editId}` : '/api/notes',
                {
                    method: isEditing ? 'PUT' : 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        title: title.trim(),
                        desc: desc.trim()
                    })
                }
            )

            const data = await response.json()

            if (!response.ok || !data.success) {
                setError(data.message || "Failed to save note")
                toast.error(data.message || "Failed to save note")
                return
            }

            toast.success(
                isEditing
                    ? "Note updated successfully!"
                    : "Note added successfully!"
            )

            localStorage.removeItem("editNote")

            setTitle("")
            setDesc("")
            setError("")
            setEditId(null)

            router.push('/my-notes')

        } catch (error) {
            console.error("Error saving note:", error)
            setError("Something went wrong. Please try again.")
            toast.error("Something went wrong. Please try again.")
        } finally {
            setIsSaving(false)
        }
    }

    const cancelForm = () => {
        localStorage.removeItem("editNote")
        setTitle("")
        setDesc("")
        setError("")
        setEditId(null)

        router.push('/my-notes')
    }


    return (
        <main className="bg-green-200 min-h-screen p-4 sm:p-6">

            <section className="w-full max-w-xl mx-auto">

                <h1 className="text-gray-900 text-center font-bold text-2xl sm:text-3xl mt-4 mb-6">
                    {editId !== null ? "Edit Your Note" : "Create Your Note"}
                </h1>

                {/* Input Fields */}
                <div className="flex flex-col justify-center items-center gap-4">

                    <input
                        value={title}
                        onChange={(e) => {
                            setTitle(e.target.value)
                            setError("")
                        }}
                        className="bg-white rounded-lg border border-gray-300 px-3 py-3 w-full max-w-md min-w-0 focus:outline-none focus:ring-2 focus:ring-green-500"
                        type="text"
                        placeholder="Enter Title Here"
                    />

                    <textarea
                        value={desc}
                        onChange={(e) => {
                            setDesc(e.target.value)
                            setError("")
                        }}
                        className="bg-white border border-gray-300 py-3 px-3 rounded-lg w-full max-w-md min-w-0 focus:outline-none focus:ring-2 focus:ring-green-500"
                        rows={5}
                        placeholder="Enter Description Here"
                    />

                    {error && (
                        <p className="text-red-600 text-sm text-center break-words">
                            {error}
                        </p>
                    )}

                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap justify-center items-center gap-3 mt-5">

                    <button
                        onClick={saveNote}
                        disabled={isSaving}
                        className="bg-green-500 text-white font-bold rounded-full px-5 py-3 hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isSaving
                            ? "Saving..."
                            : editId !== null
                                ? "Save Changes"
                                : "Save"}
                    </button>

                    <button
                        onClick={cancelForm}
                        disabled={isSaving}
                        className="bg-gray-500 text-white font-bold rounded-full px-5 py-3 hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Cancel
                    </button>

                </div>

            </section>

        </main>
    )


}

export default AddNotes
