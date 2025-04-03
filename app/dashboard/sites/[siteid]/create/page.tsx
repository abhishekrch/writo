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
import { useActionState, useState } from "react";
import TailwindEditor from "@/app/components/dashboard/EditorWrapper";
import { JSONContent } from "novel";
import { CreatePostAction } from "@/app/actions";
import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { PostSchema } from "@/app/utils/zodSchemas";

export default function ArticleCreationRoute({
  params,
}: {
  params: { siteId: string };
}) {
  const [imageUrl, setImageUrl] = useState<undefined | string>(undefined);
  const [value, setValue] = useState<JSONContent | undefined>(undefined);
  const [lastResult, action] = useActionState(CreatePostAction, undefined);
  const [form, fields] = useForm({
    lastResult,
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: PostSchema });
    },
    shouldValidate: "onBlur",
    shouldRevalidate: "onInput",
  });

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
          <form
            className="flex flex-col gap-6"
            id={form.id}
            onSubmit={form.onSubmit}
            action={action}
          >
            <div className="grid gap-2">
              <Label>Title</Label>
              <Input
                key={fields.title.key}
                name={fields.title.name}
                defaultValue={fields.title.initialValue}
                placeholder="Nextjs blogging application"
              ></Input>
              <p className="text-red-500 text-sm">{fields.title.errors}</p>
            </div>

            <div className="grid gap-2">
              <Label>Slug</Label>
              <Input
                key={fields.slug.key}
                name={fields.slug.name}
                defaultValue={fields.slug.initialValue}
                placeholder="Article Slug"
              ></Input>
              <Button className="w-fit" variant="secondary" type="button">
                <Atom className="size-4 mr-2" /> Generate Slug
              </Button>
              <p className="text-red-500 text-sm">{fields.slug.errors}</p>
            </div>

            <div className="grid gap-2">
              <Label>Small Description</Label>
              <Textarea
                key={fields.smallDescription.key}
                name={fields.smallDescription.name}
                defaultValue={fields.smallDescription.initialValue}
                placeholder="Small Description for your blog site"
                className="h-32"
              ></Textarea>
              <p className="text-red-500 text-sm">
                {fields.smallDescription.errors}
              </p>
            </div>

            <div className="grid gap-2">
              <Label> Cover Image </Label>
              <input type="hidden"
              name={fields.coverImage.name}
              key={fields.coverImage.key}
              defaultValue={fields.coverImage.initialValue}
              value={imageUrl}
              />
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
              
              <p className="text-red-500 text-sm">{fields.coverImage.errors}</p>
            </div>

            <div className="grid gap-2">
              <Label>Article Content</Label>
              <input
                type="hidden"
                name={fields.articleContent.name}
                key={fields.articleContent.key}
                defaultValue={fields.articleContent.initialValue}
                value={JSON.stringify(value)}
              />
              <TailwindEditor onChange={setValue} initialValue={value} />
              <p className="text-red-500 text-sm">{fields.articleContent.errors}</p>
            </div>
            <Button className="w-fit">Submit</Button>
          </form>
        </CardContent>
      </Card>
    </>
  );
}
