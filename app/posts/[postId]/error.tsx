"use client"; // Error components must be Client components

import Link from "next/link";
import { useEffect } from "react";
import { buttonVariants } from "@/components/ui/button";

export default function ErrorPage({
	error,
	reset,
}: { error: Error; reset: () => void }) {
	useEffect(() => {
		// Log the error to an error reporting service
		console.error(error);
	}, [error]);

	return (
		<main className="bg-slate-200 mx-auto max-w-lg py-1 px-4 text-center h-64 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
			<h2 className="my-4 text-7xl font-bold">Something went wrong!</h2>
			<button
				type="button"
				className="mb-4 p-4 bg-red-500 text-white rounded-xl"
				onClick={
					// Attempt to recover by trying to re-render the segment
					() => reset()
				}
			>
				Try again
			</button>
			<p className="text-xl">
				Or go back to{" "}
				<Link
					href="/"
					className={`${buttonVariants({
						variant: "outline",
					})}p-1 px-4 mr-4 rounded text-lg lowercase `}
				>
					Home 🏠
				</Link>
			</p>
		</main>
	);
}
