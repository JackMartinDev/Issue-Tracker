"use client";
import { Button, TextArea, TextField } from "@radix-ui/themes";
import React from "react";

const NewIssuePage = () => {
  return (
    <div className="max-w-lg space-y-3">
      <TextField.Root placeholder="Title"></TextField.Root>
      <TextArea placeholder="Describe the issue…" />
      <Button>Submit new issue</Button>
    </div>
  );
};

export default NewIssuePage;
