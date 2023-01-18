import Image from "next/image";
import { useState } from "react";
import Tony from "../public/tony.jpeg";
import Sam from "../public/sam.jpeg";
import { createGlobalState } from "react-hooks-global-state";
import { useRouter } from "next/router";

export default function Page() {
  let { query } = useRouter();
  let [isShowingNewComment, setIsShowingNewComment] = useState(false);

  console.log(query);

  return (
    <div className="max-w-lg py-8 px-4">
      <p>Issue {query.issue}</p>
      <div className="border-b pb-2">
        <h1 className="text-xl font-medium">
          Add the ability to auto-animate my entire app
        </h1>
        <div className="mt-1 flex items-center space-x-2">
          <span className="rounded-full bg-green-500 px-3 py-1 text-xs font-semibold text-white">
            Open
          </span>
          <p className="text-xs font-medium text-gray-500">
            <span className="font-bold">tony</span> opened this issue on Jun 8,
            2022
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
                commented on Jun 8, 2022
              </span>
            </p>
          </div>
          <div className="space-y-4 p-4 text-sm">
            <p>Hey man, thanks for the awesome library!</p>
            <p>
              Just have one small request if you don&apos;t mind me asking...
              could you add an `autoAnimate` prop so it just sort of
              automatically animates my entire application?
            </p>
            <p>Thanks!</p>
          </div>
        </div>
      </div>

      {isShowingNewComment ? (
        <NewComment
          key={query.issue}
          id={query.issue}
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

function NewComment({ id, onCancel } = { id: "a", onCancel: () => {} }) {
  let [draftComments, setDraftComments] = useGlobalState("draftComments");

  console.log({ draftComments });

  let x = draftComments[id];
  console.log(x);

  return (
    <div>
      <div className="mt-6 flex">
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
              value={draftComments[id]}
              onChange={(e) =>
                setDraftComments({ ...draftComments, [id]: e.target.value })
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

export async function getStaticProps() {
  return {
    // Passed to the page component as props
    props: { post: {} },
  };
}
