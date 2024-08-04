"use client";
import { Button, Callout, Text, TextField } from "@radix-ui/themes";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { useForm, Controller } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { createIssueSchema } from "@/app/valiationSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

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
      const res = await fetch(url, options);
      if (!res.ok) {
        setError("An unexpected error occured");
        return;
      }
      router.push("/issues");
    } catch (error) {
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
        {errors.title && (
          <Text color="red" as="p">
            {errors.title.message}
          </Text>
        )}
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <SimpleMDE placeholder="Describe the issue…" {...field} />
          )}
        />
        {errors.description && (
          <Text color="red" as="p">
            {errors.description.message}
          </Text>
        )}

        <Button type="submit">Submit new issue</Button>
      </form>
    </div>
  );
};

export default NewIssuePage;
