import getCurrentUser from "@/app/actions/getCurrentUser";
import { NextResponse } from "next/server";

import prisma from '../../libs/prismadb'


export async function POST(
    request: Request
){
const currentUser = await getCurrentUser()

if(!currentUser){
   new Response('unauthorized', {status: 403})
}

const body = await request.json()

const {
    title,
    description,
    imageSrc,
    category,
    roomCount,
    bathroomCount,
    guestCount,
    location,
    price,
} = body

const listings = await prisma.listing.create({
    data: {
        title,
        description,
        imageSrc,
        category,
        roomCount,
        bathroomCount,
        guestCount,
        locationValue: location.value,
        price: parseInt(price, 10),
        userId: currentUser?.id as string
    }
})
return new Response(JSON.stringify(listings))
}

// title: title as string,
// description: description as string,
// imageSrc: imageSrc as string,
// category: category as string,
// roomCount: roomCount as number,
// bathroomCount: bathroomCount as number,
// guestCount: guestCount as number,
// locationValue: location.value,
// price: parseInt(price, 10) as number,
// userId: currentUser?.id as string