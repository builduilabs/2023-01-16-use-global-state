import Image from "next/image";
import { useState } from "react";
import Sam from "../public/sam.jpeg";

export default function NewComment({
  onCancel = () => {},
}: {
  onCancel: () => void;
}) {
  let [text, setText] = useState("");

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
              value={text}
              onChange={(e) => setText(e.target.value)}
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
          onClick={() => alert(text)}
          className="rounded border border-green-600 bg-green-500 px-4 py-1 text-sm font-semibold text-white hover:bg-green-600"
        >
          Comment
        </button>
      </div>
    </div>
  );
}
