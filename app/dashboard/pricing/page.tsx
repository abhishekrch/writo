import { SubmitButton } from "@/app/components/dashboard/SubmitButtons";
import { PricingTable } from "@/app/components/shared/Pricing";
import prisma from "@/app/utils/db";
import { requireUser } from "@/app/utils/requireUser";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card";
async function getData(userId: string) {
  const data = await prisma.subscription.findUnique({
    where: {
      userId: userId,
    },
    select: {
      status: true,
      User: {
        select: {
          customerId: true,
        },
      },
    },
  });

  return data;
}

export default async function PricingPage() {
    const user = await requireUser();
    const data = await getData(user.id);

    if (data?.status === "active") {
        return (
          <Card className="w-full ">
            <CardHeader>
              <CardTitle>Edit Subscription</CardTitle>
              <CardDescription>
                Click on the button below, this will give you the opportunity to
                change your payment details and view your statement at the same
                time...
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form>
                <SubmitButton text="View Subscription Details" />
              </form>
            </CardContent>
          </Card>
        );
      }
  return (
    <div>
      <PricingTable />
    </div>
  );
}
