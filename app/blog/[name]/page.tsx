import prisma from "@/app/utils/db"
import { notFound } from "next/navigation"

async function getData(subDir: string) {
    const data = await prisma.site.findUnique({
        where: {
            subdirectory: subDir
        },
        select: {
            name: true,
            posts: {
                select: {
                    smallDescription: true,
                    title: true,
                    image: true,
                    createdAt: true,
                    slug: true,
                    id: true
                },
                orderBy: {
                    createdAt: "desc"
                }
            }
        }
    })

    if (!data) {
        return notFound()
    }

    return data;
}

export default async function BlogIndexPage({params}: {params: {name: string}}) {
    const data = await getData(params.name);
    return (
        <>
        <nav className="grid grid-cols-3">

        </nav>
        </>
    )
}