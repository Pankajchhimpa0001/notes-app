
import Link from 'next/link'

export default function About() {

    return (
        <main className="bg-green-200 min-h-screen flex items-center justify-center px-4 py-8 sm:px-6">

            <section className="bg-white rounded-2xl shadow-lg p-5 sm:p-8 w-full max-w-2xl mx-auto text-center">

                <div className="text-5xl sm:text-6xl mb-4">
                    📝
                </div>

                <h1 className="text-2xl sm:text-4xl font-bold text-green-700">
                    About My Notes
                </h1>

                <p className="text-gray-600 mt-5 leading-7 text-sm sm:text-base">
                    My Notes is a simple note-taking application where
                    you can create, edit, delete and search your notes.
                    Your notes are saved in your browser so you can
                    access them whenever you return to this application
                    in the same browser.
                </p>

                <div className="mt-6">
                    <Link
                        href="/my-notes"
                        className="inline-block bg-green-600 text-white font-bold px-5 sm:px-6 py-3 rounded-full hover:bg-green-700 transition"
                    >
                        Explore My Notes
                    </Link>
                </div>

            </section>

        </main>
    )

}

