"use client";
import { Button, TextField } from "@radix-ui/themes";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { useForm, Controller } from "react-hook-form";
import { useRouter } from "next/navigation";

interface IssueForm {
  title: string;
  description: string;
}

const NewIssuePage = () => {
  const { register, control, handleSubmit } = useForm<IssueForm>();
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

    const res = await fetch(url, options);
    console.log(await res.json());
    router.push("/issues");
  };
  return (
    <form
      className="max-w-lg space-y-3"
      onSubmit={handleSubmit((data) => onSubmitHandler(data))}
    >
      <TextField.Root
        placeholder="Title"
        {...register("title")}
      ></TextField.Root>
      <Controller
        name="description"
        control={control}
        render={({ field }) => (
          <SimpleMDE placeholder="Describe the issue…" {...field} />
        )}
      />

      <Button type="submit">Submit new issue</Button>
    </form>
  );
};

export default NewIssuePage;
