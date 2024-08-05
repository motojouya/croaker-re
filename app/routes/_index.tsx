import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  return (
    <div className="font-sans p-4">
      <h1 className="text-3xl">Welcome to Remix</h1>
      <ul className="list-disc mt-4 pl-6 space-y-2">
        <li>
          <a
            className="text-blue-700 underline visited:text-purple-900"
            target="_blank"
            href="https://remix.run/start/quickstart"
            rel="noreferrer"
          >
            5m Quick Start
          </a>
        </li>
        <li>
          <a
            className="text-blue-700 underline visited:text-purple-900"
            target="_blank"
            href="https://remix.run/start/tutorial"
            rel="noreferrer"
          >
            30m Tutorial
          </a>
        </li>
        <li>
          <a
            className="text-blue-700 underline visited:text-purple-900"
            target="_blank"
            href="https://remix.run/docs"
            rel="noreferrer"
          >
            Remix Docs
          </a>
        </li>
      </ul>
    </div>
  );
}

import type { ResponseType } from "@/app/api/croak/top/route";
import { doFetch } from "@/lib/next/utility";
import { useMaster } from "@/app/SessionProvider";
import { GetCroaks } from "@/components/parts/croaks/loadingCroakList";
import { CroakList } from "@/components/parts/croaks";

type GetTopCroaks = () => GetCroaks;
const getTopCroaks: GetTopCroaks = () => async (offsetCursor, reverse) =>
  await doFetch<ResponseType>(`/api/croak/top?reverse=${reverse}&offset_cursor=${offsetCursor || ""}`, {
    method: "GET",
  });

export default function Page() {
  // TODO hashを取得して、hashの位置を初期状態にする
  const { croaker } = useMaster();
  return <CroakList croaker={croaker} thread={null} getCroaks={getTopCroaks()} />;
}
