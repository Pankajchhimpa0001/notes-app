
import Link from 'next/link'

export default function Home() {

  return (
    <main className="bg-green-200 min-h-screen flex items-center justify-center px-4 py-10 sm:px-6">

      <section className="text-center w-full max-w-2xl mx-auto">

        {/* Emoji */}
        <div className="text-6xl sm:text-7xl mb-5 sm:mb-6">
          📝
        </div>

        {/* Heading */}
        <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold text-gray-800 leading-tight">
          Welcome to{" "}
          <span className="text-green-700">
            My Notes
          </span>
        </h1>

        {/* Description */}
        <p className="text-gray-600 text-base sm:text-lg mt-5 sm:mt-6 leading-7 sm:leading-8">
          Your thoughts, ideas and plans — all in one place.
          Create notes, organize your ideas and manage everything easily.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row flex-wrap justify-center items-center gap-3 sm:gap-4 mt-7 sm:mt-8">

          <Link
            href="/my-notes"
            className="bg-green-600 text-white font-bold px-6 py-3 rounded-full hover:bg-green-700 transition w-full sm:w-auto text-center"
          >
            Explore My Notes
          </Link>

          <Link
            href="/add-notes"
            className="bg-white text-green-700 border border-green-600 font-bold px-6 py-3 rounded-full hover:bg-green-50 transition w-full sm:w-auto text-center"
          >
            + Create New Note
          </Link>

        </div>

        {/* Tagline */}
        <p className="text-gray-500 text-sm mt-8 sm:mt-10">
          Simple. Organized. Productive.
        </p>

      </section>

    </main>
  )

}

