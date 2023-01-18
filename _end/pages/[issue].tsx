import Image from "next/image";
import { useState } from "react";
import Tony from "../public/tony.jpeg";
import Sam from "../public/sam.jpeg";
import { createGlobalState } from "react-hooks-global-state";

export default function Issue({ issue }: any) {
  let [isShowingNewComment, setIsShowingNewComment] = useState(false);

  return (
    <div>
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
            className="rounded bg-green-500 px-4 py-1 text-sm font-semibold text-white hover:bg-green-500/90"
          >
            Add comment
          </button>
        </div>
      )}
    </div>
  );
}

let { useGlobalState } = createGlobalState<{
  draftComments: Record<string, string>;
}>({
  draftComments: {},
});

function NewComment({
  issueId,
  onCancel = () => {},
}: {
  issueId: string;
  onCancel: () => void;
}) {
  let [draftComments, setDraftComments] = useGlobalState("draftComments");

  return (
    <div>
      <div className="mt-2 flex">
        <Image
          src={Sam}
          className="mr-2 h-11 w-11 rounded-full border"
          alt=""
        />
        <div className="w-full overflow-hidden rounded border border-gray-300">
          <div className="flex border-b border-gray-300 bg-gray-50 px-2 py-5">
            <span className="-mb-[21px] -mt-3 flex items-center rounded-t border-x border-t border-gray-300 bg-white px-3 text-sm text-gray-700">
              Write
            </span>
          </div>
          <div className="space-y-4 p-2 text-sm">
            <textarea
              className="w-full rounded border border-gray-300 bg-gray-50 p-3"
              placeholder="Leave a comment"
              value={draftComments[issueId]}
              onChange={(e) =>
                setDraftComments({
                  ...draftComments,
                  [issueId]: e.target.value,
                })
              }
              name=""
              id=""
              rows={6}
            ></textarea>
          </div>
        </div>
      </div>
      <div className="mt-4 flex justify-end space-x-3">
        <button
          onClick={onCancel}
          className="rounded border border-gray-300 bg-gray-100 px-4 py-1 text-sm font-semibold text-gray-600 hover:bg-gray-200"
        >
          Cancel
        </button>
        <button
          onClick={() => alert(draftComments)}
          className="rounded border border-green-600 bg-green-500 px-4 py-1 text-sm font-semibold text-white hover:bg-green-600"
        >
          Comment
        </button>
      </div>
    </div>
  );
}

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: "blocking",
  };
}

export async function getStaticProps(context: any) {
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
