import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function NewSiteRoute() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center">
      <Card className="w-full max-w-[500px] shadow-md">
        <CardHeader>
          <CardTitle>Create Site</CardTitle>
          <CardDescription>
            Create your site here. Click the button below once you are done...
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-y-6">
            <div className="grid gap-2">
              <Label>Site Name</Label>
              <Input placeholder="Site Name" />
            </div>
            <div>
              <Label>Subdirectory</Label>
              <Input placeholder="Sub directory" />
            </div>
            <div className="grid gap-2">
              <Label>Description</Label>
              <Input placeholder="Small descroption for your site" />
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button>Submit</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
