"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Atom } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";
import { UploadDropzone } from "@/app/utils/UploadthingComponents";
import { toast } from "sonner";
import TailwindEditor from "../EditorWrapper";
import { SubmitButton } from "../SubmitButtons";
import { useActionState, useState } from "react";
import { JSONContent } from "novel";
import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { PostSchema } from "@/app/utils/zodSchemas";
import { EditPostActions } from "@/app/actions";
import slugify from "react-slugify";

interface iAppProps {
  data: {
    slug: string;
    title: string;
    smallDescription: string;
    articleContent: any;
    id: string;
    image: string;
  };
  siteId: string;
}

export function EditArticleForm({ data, siteId }: iAppProps) {
  const [imageUrl, setImageUrl] = useState<undefined | string>(data.image);
  const [value, setValue] = useState<JSONContent | undefined>(
    data.articleContent
  );
  const [slug, setSlugValue] = useState<undefined | string>(data.slug);
  const [title, setTitle] = useState<undefined | string>(data.title);
  const [lastResult, action] = useActionState(EditPostActions, undefined);

  const [form, fields] = useForm({
    lastResult,
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: PostSchema });
    },
    shouldValidate: "onBlur",
    shouldRevalidate: "onInput",
  });

  function handleSlugGeneration() {
    const titleInput = title;

    if (titleInput?.length == 0 || titleInput === undefined) {
      return toast.error("Please create a title for your article");
    }

    setSlugValue(slugify(titleInput));

    return toast.success("Slug generated successfully!");
  }

  return (
    <div>
      <Card className="mt-5">
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
            <input type="hidden" name="articleId" value={data.id} />
            <input type="hidden" name="siteId" value={siteId} />
            <div className="grid gap-2">
              <Label>Title</Label>
              <Input
                key={fields.title.key}
                name={fields.title.name}
                defaultValue={fields.title.initialValue}
                placeholder="Nextjs blogging application"
                onChange={(e) => setTitle(e.target.value)}
                value={title}
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
                onChange={(e) => setSlugValue(e.target.value)}
                value={slug}
              ></Input>
              <Button
                onClick={handleSlugGeneration}
                className="w-fit cursor-pointer"
                variant="secondary"
                type="button"
              >
                <Atom className="size-4 mr-2" /> Generate Slug
              </Button>
              <p className="text-red-500 text-sm">{fields.slug.errors}</p>
            </div>

            <div className="grid gap-2">
              <Label>Small Description</Label>
              <Textarea
                key={fields.smallDescription.key}
                name={fields.smallDescription.name}
                defaultValue={data.smallDescription}
                placeholder="Small Description for your blog site"
                className="h-32"
              ></Textarea>
              <p className="text-red-500 text-sm">
                {fields.smallDescription.errors}
              </p>
            </div>

            <div className="grid gap-2">
              <Label> Cover Image </Label>
              <input
                type="hidden"
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
              <p className="text-red-500 text-sm">
                {fields.articleContent.errors}
              </p>
            </div>
            <SubmitButton text="Edit Article" />
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
