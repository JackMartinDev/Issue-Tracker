"use client";
import { Button, Callout, TextField } from "@radix-ui/themes";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { useForm, Controller } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { issueSchema } from "@/app/valiationSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ErrorMessage, Spinner } from "@/app/components";
import { Issue } from "@prisma/client";
import axios from "axios";

type IssueFormData = z.infer<typeof issueSchema>;

const IssueForm = ({ issue }: { issue?: Issue }) => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IssueFormData>({
    resolver: zodResolver(issueSchema),
  });

  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const createIssue = async (data: IssueFormData) => {
    try {
      setIsSubmitting(true);
      if (issue) {
        await axios.patch("/api/issues/" + issue.id, data);
      } else {
        await axios.post("/api/issues", data);
      }
      router.push("/issues");
      router.refresh();
    } catch (error) {
      setIsSubmitting(false);
      setError("An unexpected error occured");
    }
  };

  return (
    <div>
      {error && (
        <Callout.Root className="max-w-lg mb-5">
          <Callout.Text color="red">{error}</Callout.Text>
        </Callout.Root>
      )}
      <form
        className="max-w-lg space-y-3"
        onSubmit={handleSubmit((data) => createIssue(data))}
      >
        <TextField.Root
          placeholder="Title"
          defaultValue={issue?.title}
          {...register("title")}
        ></TextField.Root>
        <ErrorMessage>{errors.title?.message}</ErrorMessage>
        <Controller
          name="description"
          control={control}
          defaultValue={issue?.description}
          render={({ field }) => (
            <SimpleMDE placeholder="Describe the issue…" {...field} />
          )}
        />
        <ErrorMessage>{errors.description?.message}</ErrorMessage>
        <Button type="submit" disabled={isSubmitting}>
          {issue ? "Update Issue" : "Submit new issue"}
          {isSubmitting && <Spinner />}
        </Button>
      </form>
    </div>
  );
};

export default IssueForm;
