"use client";

import React, { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { MoonIcon, SunIcon } from "./Icons";

const ThemeSwitch = () => {
	const { theme, setTheme } = useTheme();
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
	}, []);

	if (!mounted) {
		return null;
	}

	return (
		<button
			aria-label="Toggle Dark Mode"
			type="button"
			className="border border-purple-500 rounded-2xl p-1 hover:bg-purple-500/10 dark:hover:bg-amber-50/10"
			onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
		>
			{theme === "dark" ? <SunIcon /> : <MoonIcon />}
		</button>
	);
};

export default ThemeSwitch;
