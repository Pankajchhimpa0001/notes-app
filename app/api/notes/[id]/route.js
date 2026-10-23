
import { NextResponse } from 'next/server'
import { ObjectId } from 'mongodb'
import clientPromise from '@/lib/mongodb'

export async function PUT(request, { params }) {
    try {
        const { id } = await params

        // Validate MongoDB ID
        if (!ObjectId.isValid(id)) {
            return NextResponse.json(
                {
                    success: false,
                    message: 'Invalid note ID'
                },
                { status: 400 }
            )
        }

        // Get updated data
        const body = await request.json()
        const { title, desc } = body

        if (
            typeof title !== 'string' ||
            typeof desc !== 'string' ||
            !title.trim() ||
            !desc.trim()
        ) {
            return NextResponse.json(
                {
                    success: false,
                    message: 'Title and description are required'
                },
                { status: 400 }
            )
        }

        // Connect to MongoDB
        const client = await clientPromise
        const db = client.db('myNotesDB')

        // Update the note
        const result = await db.collection('notes').updateOne(
            { _id: new ObjectId(id) },
            {
                $set: {
                    title: title.trim(),
                    desc: desc.trim(),
                    updatedAt: new Date()
                }
            }
        )

        if (result.matchedCount === 0) {
            return NextResponse.json(
                {
                    success: false,
                    message: 'Note not found'
                },
                { status: 404 }
            )
        }

        return NextResponse.json({
            success: true,
            message: 'Note updated successfully'
        })

    } catch (error) {
        console.error('Update Note Error:', error)

        return NextResponse.json(
            {
                success: false,
                message: 'Failed to update note'
            },
            { status: 500 }
        )
    }
}

export async function DELETE(request, { params }) {
    try {
        const { id } = await params

        if (!ObjectId.isValid(id)) {
            return NextResponse.json(
                {
                    success: false,
                    message: 'Invalid note ID'
                },
                { status: 400 }
            )
        }

        const client = await clientPromise
        const db = client.db('myNotesDB')

        const result = await db.collection('notes').deleteOne({
            _id: new ObjectId(id)
        })

        if (result.deletedCount === 0) {
            return NextResponse.json(
                {
                    success: false,
                    message: 'Note not found'
                },
                { status: 404 }
            )
        }

        return NextResponse.json({
            success: true,
            message: 'Note deleted successfully'
        })

    } catch (error) {
        console.error('Delete Note Error:', error)

        return NextResponse.json(
            {
                success: false,
                message: 'Failed to delete note'
            },
            { status: 500 }
        )
    }
}