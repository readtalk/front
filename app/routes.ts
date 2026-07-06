import { type RouteConfig, layout, route } from "@react-router/dev/routes";

export default [
    // ===== PUBLIC ROUTES =====
    route("/", "routes/_index.tsx"),          // ← Halaman Welcome
    route("register", "routes/auth/register.tsx"),
    route("login", "routes/auth/login.tsx"),    

    // ===== PROTECTED ROUTES (with AuthLayout) =====
    layout("components/layouts/AuthLayout.tsx", [
        route("overview", "routes/overview.tsx"),
        route("channel/:id", "routes/channel.tsx"),
    ]),
] satisfies RouteConfig;
