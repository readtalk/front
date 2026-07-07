import { type RouteConfig, layout, route } from "@react-router/dev/routes";

export default [
    // 🌐 Halaman publik (tanpa layout, seperti /setup di ai-gateway)
    route("", "routes/welcome.tsx"),  // Halaman utama (Welcome)
    route("login", "routes/auth/login.tsx"),
    route("register", "routes/auth/register.tsx"),

    // 🔐 Halaman yang butuh login (dengan AuthLayout)
    layout("components/layouts/AuthLayout.tsx", [
        route("overview", "routes/overview.tsx"),
        route("channel/:id", "routes/channel.tsx"),
    ]),
] satisfies RouteConfig;
