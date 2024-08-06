import { Button } from "@radix-ui/themes";
import { IconEdit } from "@tabler/icons-react";
import Link from "next/link";

const EditIssueButton = ({issueId} : {issueId:number}) => {
  return (
    <Button>
      <IconEdit />
      <Link href={`/issues/${issueId}/edit`}>Edit Issue</Link>
    </Button>
  )
}

export default EditIssueButton
