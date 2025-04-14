import { EmptyState } from "../components/dashboard/EmptyState";
import prisma from "../utils/db";
import { requireUser } from "../utils/requireUser";

async function getData(userId: string) {
  const [sites, articles] = await Promise.all([
    prisma.site.findMany({
      where: {
        userId: userId,
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 3,
    }),
    prisma.post.findMany({
      where: {
        userId: userId,
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 3,
    }),
  ]);

  return { sites, articles };
}

export default async function DashboardIndexPage() {
  const user = await requireUser()
  const {articles, sites} = await getData(user.id);
  return (
    <div>
      <h1 className="text-2xl font-semibold mb-5">Your Sites</h1>
      {sites.length > 0 ? (
        <div>

        </div>
      ): (
        <EmptyState
        title="You dont have any sites created"
        description="You currently dont have any Sites. Please create some so that you can see them right here."
        href="/dashboard/sites/new"
        buttonText="Create Site"
      />
      )}
    </div>
  )
}
