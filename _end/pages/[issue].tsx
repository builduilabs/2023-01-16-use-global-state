import NewComment from "@/components/new-comment";
import Image from "next/image";
import { useState } from "react";
import Tony from "../public/tony.jpeg";

export default function Issue({ issue }: any) {
  let [isShowingNewComment, setIsShowingNewComment] = useState(false);

  return (
    <div key={issue.id}>
      <div className="border-b pb-2">
        <h1 className="text-xl font-medium">{issue.title}</h1>
        <div className="mt-1 flex items-center space-x-2">
          <span className="rounded-full bg-green-500 px-3 py-1 text-xs font-semibold text-white">
            Open
          </span>
          <p className="text-xs font-medium text-gray-500">
            <span className="font-bold">tony</span> opened this issue on{" "}
            {issue.date}
          </p>
        </div>
      </div>

      <div className="mt-6 flex">
        <Image
          src={Tony}
          className="mr-2 h-11 w-11 rounded-full border"
          alt=""
        />
        <div className="w-full overflow-hidden rounded border border-blue-200">
          <div className="border-b border-blue-200 bg-blue-100 px-4 py-2">
            <p className="text-xs">
              <span className="font-bold">tony</span>{" "}
              <span className="font-medium text-black/60">
                commented on {issue.comment.date}
              </span>
            </p>
          </div>
          <div
            className="space-y-4 p-4 text-sm"
            dangerouslySetInnerHTML={{ __html: issue.comment.html }}
          />
        </div>
      </div>

      {isShowingNewComment ? (
        <NewComment
          issueId={issue.id}
          onCancel={() => setIsShowingNewComment(false)}
        />
      ) : (
        <div className="mt-6 text-right">
          <button
            onClick={() => setIsShowingNewComment(true)}
            className="rounded border border-gray-300 bg-gray-100 px-4 py-1 text-sm font-semibold text-gray-600 hover:bg-gray-200"
          >
            Add comment
          </button>
        </div>
      )}
    </div>
  );
}

export async function getServerSideProps(context: any) {
  return {
    props: { issue: issues.find((i) => i.id === context.params.issue) },
  };
}

let issues = [
  {
    id: "1",
    title: "Add the ability to auto-animate my entire app",
    date: "Jun 8, 2022",
    comment: {
      date: "Jun 8, 2022",
      html: `
            <p>Hey man, thanks for the awesome library!</p>

            <p>Just have one small request if you don't mind me asking... could you add an "autoAnimate" prop so it just sort of automatically animates my entire application?</p>
          
            <p>Thankss!</p>`,
    },
  },
  {
    id: "2",
    title: "I think it's broken",
    date: "Jul 14, 2022",
    comment: {
      date: "Jul 14, 2022",
      html: `
            <p>Hey man, it's me again.</p>

            <p>I tried to use your new API but it didn't work. Could you help me out? 😄</p>`,
    },
  },
];
