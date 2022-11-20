"use client"

import { use } from "react"

const fetchMap = new Map<string, Promise<any>>();

function queryClient<QueryResult>(name: string, query: () => Promise<QueryResult>): Promise<QueryResult> {
  if (!fetchMap.has(name)) {
    fetchMap.set(name, query())
  }

  return fetchMap.get(name)!;
}

export default function Home() {
  const data = use(queryClient("hello", () => 
    fetch("http://localhost:3000/api/hello")
      .then((res) => res.json()) as Promise<{ message: string }>)
    )

  return (
    <div>
      {JSON.stringify(data)}
    </div>
  )
}
