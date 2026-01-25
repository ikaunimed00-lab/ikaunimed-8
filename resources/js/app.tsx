import "../css/app.css";
import "../css/ads.css";

import { createInertiaApp } from "@inertiajs/react";
import { resolvePageComponent } from "laravel-vite-plugin/inertia-helpers";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { initializeTheme } from "./hooks/use-appearance";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { route as routeFn } from "ziggy-js";

// Polyfill global route function to ensure Ziggy config is picked up correctly
if (typeof window !== "undefined") {
    (window as any).route = (name: string, params?: any, absolute?: boolean, config?: any) => {
        const ziggy = config || (window as any).Ziggy;
        return routeFn(name, params, absolute, ziggy);
    };
}

const appName = import.meta.env.VITE_APP_NAME || "Laravel";
const queryClient = new QueryClient();

initializeTheme();

createInertiaApp({
    title: (title) => (title ? `${title} - ${appName}` : appName),

    resolve: (name) =>
        resolvePageComponent(
            `./Pages/${name}.tsx`,
            import.meta.glob("./Pages/**/*.tsx")
        ),

    setup({ el, App, props }) {
        createRoot(el).render(
            <StrictMode>
                <QueryClientProvider client={queryClient}>
                    <App {...props} />
                </QueryClientProvider>
            </StrictMode>
        );
    },

    progress: {
        color: "#FF7E00",
    },
});
