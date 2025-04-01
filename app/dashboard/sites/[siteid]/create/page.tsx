"use client";

import { UploadDropzone } from "@/app/utils/UploadthingComponents";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Atom } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import TailwindEditor from "@/app/components/dashboard/EditorWrapper";
import { JSONContent } from "novel";

export default function ArticleCreationRoute({
  params,
}: {
  params: { siteId: string };
}) {
  const [imageUrl, setImageUrl] = useState<undefined | string>(undefined);
  const [value, setValue] = useState<JSONContent | undefined>(undefined);
  return (
    <>
      <div className="flex items-center">
        <Button size="icon" variant="outline" className="mr-3" asChild>
          <Link href={`/dashboard/sites/${params.siteId}`}>
            <ArrowLeft className="size-4" />
          </Link>
        </Button>
        <h1 className="text-xl font-semibold">Create Article</h1>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Article Details</CardTitle>
          <CardDescription>This is the details of the article.</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label>Title</Label>
              <Input placeholder="Nextjs blogging application"></Input>
            </div>

            <div className="grid gap-2">
              <Label>Slug</Label>
              <Input placeholder="Article Slug"></Input>
              <Button className="w-fit" variant="secondary" type="button">
                <Atom className="size-4 mr-2" /> Generate Slug
              </Button>
            </div>

            <div className="grid gap-2">
              <Label>Small Description</Label>
              <Textarea
                placeholder="Small Description for your blog site"
                className="h-32"
              ></Textarea>
            </div>

            <div className="grid gap-2">
              <Label> Cover Image </Label>
              {imageUrl ? (
                <Image
                  src={imageUrl}
                  alt="Uploaded Image"
                  className="object-cover w-[200px] h-[200px] rounded-lg"
                  width={200}
                  height={200}
                />
              ) : (
                <UploadDropzone
                  endpoint="imageUploader"
                  onClientUploadComplete={(res) => {
                    setImageUrl(res[0].ufsUrl);
                    console.log("Files: ", res);
                    toast.success("Upload completed successfully!");
                  }}
                  onUploadError={(error) => {
                    console.error("Error: ", error);
                    toast.error(`Error: ${error.message}`);
                  }}
                />
              )}
            </div>
            <div className="grid gap-2">
              <Label>Article Content</Label>
              <TailwindEditor onChange={setValue} initialValue={value} />
            </div>
            <Button className="w-fit">Submit</Button>
          </form>
        </CardContent>
      </Card>
    </>
  );
}
