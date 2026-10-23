
import { NextResponse } from 'next/server'
import clientPromise from '@/lib/mongodb'



export async function GET() {
    try {
        const client = await clientPromise
        const db = client.db('myNotesDB')

        const notes = await db.collection('notes').find({}).toArray()

        return NextResponse.json({
            success: true,
            notes
        })
    } catch (error) {
        console.error('MongoDB Error:', error)

        return NextResponse.json(
            {
                success: false,
                message: 'Failed to fetch notes'
            },
            { status: 500 }
        )
    }
}

export async function POST(request) {
    try {
        const client = await clientPromise
        const db = client.db('myNotesDB')

        const body = await request.json()

        if (
            !body.title?.trim() ||
            !body.desc?.trim()
        ) {
            return NextResponse.json(
                {
                    success: false,
                    message: 'Title and description are required'
                },
                { status: 400 }
            )
        }

        const newNote = {
            title: body.title.trim(),
            desc: body.desc.trim(),
            createdAt: new Date()
        }

        const result = await db
            .collection('notes')
            .insertOne(newNote)

        return NextResponse.json(
            {
                success: true,
                message: 'Note added successfully',
                note: {
                    ...newNote,
                    _id: result.insertedId
                }
            },
            { status: 201 }
        )
    } catch (error) {
        console.error('MongoDB Error:', error)

        return NextResponse.json(
            {
                success: false,
                message: 'Failed to add note'
            },
            { status: 500 }
        )
    }
}
