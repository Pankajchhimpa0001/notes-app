
"use client"

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from "react-toastify";
const MyNotes = () => {
    const [notes, setNotes] = useState([])
    const [search, setSearch] = useState("")
    const [isLoaded, setIsLoaded] = useState(false)

    const router = useRouter()


    useEffect(() => {
        const fetchNotes = async () => {
            try {
                const response = await fetch('/api/notes')
                const data = await response.json()

                if (data.success) {
                    setNotes(data.notes)
                }
            } catch (error) {
                console.error("Error fetching notes:", error)
            } finally {
                setIsLoaded(true)
            }
        }

        fetchNotes()
    }, [])



    const deleteNote = async (index) => {
        const result = confirm("Are you sure you want to delete this note?")

        if (!result) return

        const noteToDelete = notes[index]

        try {
            const response = await fetch(`/api/notes/${noteToDelete._id}`, {
                method: 'DELETE'
            })

            const data = await response.json()

            if (!response.ok || !data.success) {
                toast.error(data.message || "Failed to delete note")
                return
            }

            setNotes(notes.filter((_, i) => i !== index))
            toast.success("Note deleted successfully!");
        } catch (error) {
            console.error("Error deleting note:", error)
            toast.error("Something went wrong while deleting the note.")
        }
    }


    const clearAllNotes = async () => {
        const result = confirm("Are you sure you want to delete all notes?")

        if (!result) return

        try {
            const response = await fetch('/api/notes/all', {
                method: 'DELETE'
            })

            const data = await response.json()

            if (!response.ok || !data.success) {
                toast.error(data.message || "Failed to delete all notes")
                return
            }

            setNotes([])
            toast.success("All notes deleted successfully!");
        } catch (error) {
            console.error("Error deleting all notes:", error)
            toast.error("Something went wrong while deleting notes.")
        }
    }



    const editNote = (index) => {
        const noteToEdit = notes[index]

        localStorage.setItem("editNote", JSON.stringify({
            id: noteToEdit._id,
            title: noteToEdit.title,
            desc: noteToEdit.desc
        }))

        router.push('/add-notes')
    }



    const filteredNotes = notes
        .map((note, index) => ({ ...note, originalIndex: index }))
        .filter((note) =>
            note.title.toLowerCase().includes(search.toLowerCase()) ||
            note.desc.toLowerCase().includes(search.toLowerCase())
        )

    if (!isLoaded) {
        return (
            <main className="bg-green-200 min-h-screen flex justify-center items-center">
                <p className="text-xl font-bold text-gray-700">
                    Loading notes...
                </p>
            </main>
        )
    }

    return (
        <main className="bg-green-200 min-h-screen p-4 sm:p-6">

            <h1 className="font-bold text-2xl sm:text-3xl text-center">
                My Notes
            </h1>

            <p className="text-center text-gray-600 mt-2 text-sm sm:text-base">
                All your saved notes in one place.
            </p>

            <p className="text-center text-gray-600 mt-2 text-sm sm:text-base">
                Showing {filteredNotes.length} of {notes.length} notes
            </p>

            {/* Search Bar */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center mt-4 gap-2 w-full max-w-md mx-auto">

                <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search your notes..."
                    className="border border-gray-300 rounded-lg px-4 py-2 w-full min-w-0"
                />

                <button
                    onClick={() => setSearch("")}
                    className="bg-green-500 text-white px-4 py-2 rounded-full hover:bg-green-600 whitespace-nowrap"
                >
                    Clear
                </button>

            </div>

            {/* Clear All Notes */}
            {notes.length > 0 && (
                <div className="flex justify-center mt-4">
                    <button
                        onClick={clearAllNotes}
                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-full"
                    >
                        Clear All Notes
                    </button>
                </div>
            )}

            {/* Notes Container */}
            <div className="flex flex-wrap justify-center gap-4 mt-6">

                {notes.length === 0 && (
                    <p className="font-bold text-lg sm:text-2xl text-center">
                        No notes yet. Create your first note!
                    </p>
                )}

                {notes.length > 0 && filteredNotes.length === 0 && (
                    <p className="text-center font-bold text-lg sm:text-2xl text-gray-500 w-full">
                        No matching notes found.
                    </p>
                )}

                {filteredNotes.map((note) => (
                    <div
                        key={note.originalIndex}
                        className="border border-gray-300 rounded-lg p-4 w-full sm:w-80 min-w-0 bg-white"
                    >
                        <h2 className="font-bold text-lg sm:text-xl break-words">
                            {note.title}
                        </h2>

                        <p className="text-gray-600 mt-2 whitespace-pre-wrap break-words">
                            {note.desc}
                        </p>

                        <div className="flex flex-wrap gap-2 mt-3">
                            <button
                                onClick={() => editNote(note.originalIndex)}
                                className="bg-green-500 hover:bg-green-600 text-white font-bold rounded-full px-3 py-2"
                            >
                                Edit
                            </button>

                            <button
                                onClick={() => deleteNote(note.originalIndex)}
                                className="bg-red-500 hover:bg-red-600 text-white font-bold rounded-full px-3 py-2"
                            >
                                Delete
                            </button>
                        </div>

                    </div>
                ))}

            </div>

        </main>
    )


    
}

export default MyNotes

