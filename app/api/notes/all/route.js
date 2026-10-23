
import { NextResponse } from 'next/server'
import clientPromise from '@/lib/mongodb'

export async function DELETE() {
    try {
        const client = await clientPromise
        const db = client.db('myNotesDB')

        const result = await db.collection('notes').deleteMany({})

        return NextResponse.json({
            success: true,
            message: 'All notes deleted successfully',
            deletedCount: result.deletedCount
        })
    } catch (error) {
        console.error('Delete All Notes Error:', error)

        return NextResponse.json(
            {
                success: false,
                message: 'Failed to delete all notes'
            },
            { status: 500 }
        )
    }
}
