// File: resources/js/config/sidebar-menu-config.ts
/**
 * SINGLE SOURCE OF TRUTH untuk Sidebar Menu
 * Digunakan oleh semua custom layouts (Admin, Editor, Writer, Subscriber)
 */

import {
    Home,
    Newspaper,
    Users,
    FileCheck,
    User,
    MessageCircle,
    PlusCircle,
    Bell,
    LayoutDashboard,
    Database,
    Briefcase,
    GraduationCap,
    Handshake,
} from "lucide-react";

export type UserRole = "admin" | "editor" | "writer" | "subscriber";

export interface MenuItem {
    title: string;
    route: string;
    icon: any;
    roles: UserRole[]; // Menu ini bisa diakses oleh role mana saja
}

/**
 * MASTER SIDEBAR MENU
 * Semua menu didefinisikan di sini, lalu difilter per role di layout
 */
export const SIDEBAR_MENU: MenuItem[] = [
    // === HOME ===
    {
        title: "Home Portal",
        route: "home",
        icon: Home,
        roles: ["admin", "editor", "writer", "subscriber"],
    },

    // === DASHBOARD ===
    {
        title: "Dashboard",
        route: "dashboard.admin",
        icon: LayoutDashboard,
        roles: ["admin"],
    },
    {
        title: "Dashboard",
        route: "dashboard.editor",
        icon: LayoutDashboard,
        roles: ["editor"],
    },
    {
        title: "Dashboard",
        route: "dashboard.writer",
        icon: LayoutDashboard,
        roles: ["writer"],
    },
    {
        title: "Dashboard",
        route: "dashboard.subscriber",
        icon: LayoutDashboard,
        roles: ["subscriber"],
    },

    // === BERITA ===
    {
        title: "Kelola Berita",
        route: "admin.news.index",
        icon: Newspaper,
        roles: ["admin", "editor"],
    },
    {
        title: "Buat Artikel",
        route: "admin.news.create",
        icon: PlusCircle,
        roles: ["writer"],
    },

    // === USER MANAGEMENT ===
    {
        title: "Kelola User",
        route: "admin.users.index",
        icon: Users,
        roles: ["admin"],
    },

    // === DATABASE ALUMNI ===
    {
        title: "Kelola Database",
        route: "dashboard.database.index",
        icon: Database,
        roles: ["admin", "editor"],
    },

    // === PROFESIONAL ===
    {
        title: "Lowongan Kerja",
        route: "dashboard.jobs.index",
        icon: Briefcase,
        roles: ["admin", "editor", "subscriber"],
    },
    {
        title: "Beasiswa",
        route: "dashboard.scholarships.index",
        icon: GraduationCap,
        roles: ["admin", "editor"],
    },
    {
        title: "Kemitraan",
        route: "dashboard.partnerships.index",
        icon: Handshake,
        roles: ["admin", "editor"],
    },

    // === PENGATURAN ===
    {
        title: "Kelola Halaman",
        route: "dashboard.admin.pages.index",
        icon: FileCheck,
        roles: ["admin", "editor"],
    },

    // === LEGALISASI ===
    {
        title: "Kelola Legalisasi",
        route: "dashboard.admin.legalizations.index",
        icon: FileCheck,
        roles: ["admin"],
    },
    {
        title: "Legalisasi Ijazah",
        route: "legalization.index",
        icon: FileCheck,
        roles: ["subscriber"],
    },

    // === KABAR ALUMNI ===
    {
        title: "Kabar Alumni",
        route: "dashboard.subscriber.alumni-posts.index",
        icon: MessageCircle,
        roles: ["subscriber"],
    },
    {
        title: "Moderasi Alumni",
        route: "dashboard.editor.alumni-posts.moderation",
        icon: Bell,
        roles: ["admin", "editor"],
    },

    // === PROFILE ===
    {
        title: "Profil",
        route: "profile.edit",
        icon: User,
        roles: ["subscriber", "admin"],
    },
    {
        title: "Profile Saya",
        route: "profile.edit",
        icon: User,
        roles: ["editor", "writer"],
    },
];

/**
 * Helper function: Ambil menu berdasarkan role
 */
export function getMenuByRole(role: UserRole): MenuItem[] {
    return SIDEBAR_MENU.filter((menu) => menu.roles.includes(role));
}

/**
 * Helper: Generate route dengan Ziggy
 */
export function routeName(routeStr: string): string {
    // @ts-ignore
    return route(routeStr);
}