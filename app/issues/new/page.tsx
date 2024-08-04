"use client";
import { Button, TextField } from "@radix-ui/themes";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";

const NewIssuePage = () => {
  return (
    <div className="max-w-lg space-y-3">
      <TextField.Root placeholder="Title"></TextField.Root>
      <SimpleMDE placeholder="Describe the issue…" />
      <Button>Submit new issue</Button>
    </div>
  );
};

export default NewIssuePage;
