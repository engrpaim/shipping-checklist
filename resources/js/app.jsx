import React from "react";
import "../css/app.css";
import { createRoot } from "react-dom/client";
import { createInertiaApp } from "@inertiajs/react";
import { resolvePageComponent } from "laravel-vite-plugin/inertia-helpers";
import { AppProvider } from "./Context/AppContext";
import 'typeface-poppins';
const appName = "Shipping Checklist";

createInertiaApp({
  title: (title) => `${appName} - ${title}`,
  resolve: async (name) => {
    const page = await resolvePageComponent(
      `./Pages/${name}.jsx`,
      import.meta.glob("./Pages/**/*.jsx")
    );

    // ✅ Wrap every page with <AppProvider>
    page.default.layout = (page) => (
      <AppProvider>{page}</AppProvider>
    );

    return page;
  },
  setup({ el, App, props }) {
    const root = createRoot(el);
    root.render(
      <React.StrictMode>
        <App {...props} />
      </React.StrictMode>
    );
  },
  progress: { color: "#4B5563" },
});
