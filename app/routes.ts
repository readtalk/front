import { type RouteConfig, layout, route } from "@react-router/dev/routes";

export default [    
    route("register", "routes/auth/register.tsx"),
    route("login", "routes/auth/login.tsx"),    

    layout("components/layouts/AuthLayout.tsx", [
        route("overview", "routes/overview.tsx"),
        route("channel/:id", "routes/channel.tsx"),
    ]),
] satisfies RouteConfig;
