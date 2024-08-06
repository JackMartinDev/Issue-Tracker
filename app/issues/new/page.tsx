"use client";
import { Button, Callout, TextField } from "@radix-ui/themes";
import dynamic from "next/dynamic";
import "easymde/dist/easymde.min.css";
import { useForm, Controller } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { createIssueSchema } from "@/app/valiationSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ErrorMessage, Spinner } from "@/app/components"

const SimpleMDE = dynamic(
  () => import('react-simplemde-editor'),
  { ssr: false }
)

type IssueForm = z.infer<typeof createIssueSchema>;

const NewIssuePage = () => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IssueForm>({
    resolver: zodResolver(createIssueSchema),
  });
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const onSubmitHandler = async (data: IssueForm) => {
    const url = "http://localhost:3000/api/issues";
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };

    try {
      setIsSubmitting(true)
      const res = await fetch(url, options);
      if (!res.ok) {
        setError("An unexpected error occured");
        setIsSubmitting(false)
        return;
      }
      router.push("/issues");
    } catch (error) {
      setIsSubmitting(false)
      console.log(error);
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
        onSubmit={handleSubmit((data) => onSubmitHandler(data))}
      >
        <TextField.Root
          placeholder="Title"
          {...register("title")}
        ></TextField.Root>
        <ErrorMessage>
          {errors.title?.message}
        </ErrorMessage>
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <SimpleMDE placeholder="Describe the issue…" {...field} />
          )}
        />
        <ErrorMessage>
          {errors.description?.message}
        </ErrorMessage>
        <Button type="submit" disabled={isSubmitting}>Submit new issue {isSubmitting &&<Spinner />}</Button>
      </form>
    </div>
  );
};

export default NewIssuePage;
